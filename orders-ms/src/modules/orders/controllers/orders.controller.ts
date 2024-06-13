import { Request, Response } from 'express';
import { Body, Controller, Get, Param, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { OrdersRepository } from '../../../providers/repositories/typeorm/OrdersRepository';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import { GenericError } from '../../../common/errors/GenericError';
import { ApiProductsProvider } from 'src/providers/products_data/ApiProductsProvider';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly apiProductsProvider: ApiProductsProvider,
  ) {}

  private readonly ordersService = new OrdersService(this.ordersRepository, this.apiProductsProvider);

  @Get()
  async getAll(@Req() _req: Request, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.ordersService.getAll();
      return res.status(200).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Get(':id')
  async getOneById(@Req() req: Request, @Res() res: Response, @Param('id') id: number): Promise<Response> {
    try {
      const result = await this.ordersService.getOneById(id);
      return res.status(200).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Post()
  async create(
    @Req() _req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422, transform: true })) orderDTO: CreateOrderDTO,
  ): Promise<Response> {
    try {
      const result = await this.ordersService.create(orderDTO);
      return res.status(201).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
