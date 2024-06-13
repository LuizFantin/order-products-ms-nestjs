import { Product } from '../models/product.model';

export interface IApiProductsProvider {
  getProductDetailsById(product_id: number): Promise<Product | null>;
}
