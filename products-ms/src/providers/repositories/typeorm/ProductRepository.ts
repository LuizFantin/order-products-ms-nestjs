import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/modules/products/dto/createProduct.dto';
import { UpdateProductDTO } from 'src/modules/products/dto/updateProduct.dto';
import { IProductRepository } from 'src/modules/products/interfaces/IProductRepository';
import { Product } from 'src/modules/products/models/product.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);
    if (product) return await this.productRepository.remove(product);
    return null;
  }
  async save(product: CreateProductDTO | UpdateProductDTO): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }
}
