import { Product } from 'src/modules/orders/models/product.model';
import { ApiProductsGateway } from './ApiProducts.gateway';
import { IApiProductsProvider } from '../../modules/orders/interfaces/IApiProductsProvider';

export class ApiProductsProvider implements IApiProductsProvider {
  private readonly productGateway: ApiProductsGateway;
  constructor() {
    this.productGateway = new ApiProductsGateway();
  }
  async updateProductInfo(product: Product): Promise<Product> {
    return this.productGateway.updateProduct(product);
  }

  async getProductDetailsById(product_id: number): Promise<Product | null> {
    return this.productGateway.getProductById(product_id);
  }
}
