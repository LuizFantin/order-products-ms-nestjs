import { Body, Controller, Delete, Get, Post, Put, Req, Res, ValidationPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Request, Response } from 'express';
import { ProductRepository } from '../../../providers/repositories/typeorm/ProductRepository';
import { CreateProductDTO } from '../dto/createProduct.dto';
import { GenericError } from '../../../common/errors/GenericError';
import { UpdateProductDTO } from '../dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productRepository: ProductRepository) {}

  private readonly productsService = new ProductsService(this.productRepository);

  @Get()
  async getAll(@Req() _req: Request, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.productsService.getAll();
      return res.status(200).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Get(':id')
  async getOneById(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const result = await this.productsService.getOneById(id);
      return res.status(200).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422, transform: true })) productDTO: CreateProductDTO,
  ): Promise<Response> {
    try {
      const result = await this.productsService.create(productDTO);
      return res.status(201).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Put()
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422, transform: true })) productDTO: UpdateProductDTO,
  ): Promise<Response> {
    try {
      const result = await this.productsService.update(productDTO);
      return res.status(201).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const result = await this.productsService.delete(id);
      return res.status(200).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
