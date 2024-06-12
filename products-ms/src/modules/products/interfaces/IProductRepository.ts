import { CreateProductDTO } from '../dto/createProduct.dto';
import { UpdateProductDTO } from '../dto/updateProduct.dto';
import { Product } from '../models/product.model';

export interface IProductRepository {
  findAll(): Promise<Array<Product>>;
  findOne(id: number): Promise<Product | null>;
  save(product: CreateProductDTO | UpdateProductDTO): Promise<Product>;
  delete(id: number): Promise<Product>;
}
