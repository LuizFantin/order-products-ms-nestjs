import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { IProductRepository } from '../interfaces/IProductRepository';
import { CreateProductDTO } from '../dto/createProduct.dto';
import { GenericError } from '../../../common/errors/GenericError';
import { UpdateProductDTO } from '../dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private productRepository: IProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getOneById(id: number): Promise<Product | null> {
    const result = await this.productRepository.findOne(id);
    if (!result) {
      throw new GenericError(404, 'Product Not Found');
    }
    return result;
  }

  async create(product: CreateProductDTO): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(product: UpdateProductDTO): Promise<Product> {
    const result = await this.productRepository.findOne(product.id);
    if (!result) {
      throw new GenericError(404, 'Product Not Found');
    }
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<Product> {
    const result = await this.productRepository.delete(id);
    if (!result) {
      throw new GenericError(404, 'Product Not Found');
    }
    return result;
  }
}
