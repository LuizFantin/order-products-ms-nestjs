import { Product } from '../../modules/orders/models/product.model';

export class ApiProductsGateway {
  async getProductById(product_id: number): Promise<Product | null> {
    const url = `${process.env.PRODUCTS_API_BASE_URL}/products/${product_id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        const product = new Product(result.data.id, result.data.name, result.data.price, result.data.quantity);
        return product;
      } else if (response.status === 404) {
        return null;
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}
