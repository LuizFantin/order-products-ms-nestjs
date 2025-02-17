import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { IOrdersRepository } from '../interfaces/IOrdersRepository';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import { GenericError } from '../../../common/errors/GenericError';
import { IApiProductsProvider } from '../interfaces/IApiProductsProvider';
import { Product } from '../models/product.model';
import { OrderStatus } from '../../../common/const/orderStatus';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: IOrdersRepository,
    private apiProductsProvider: IApiProductsProvider,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  async getOneById(id: number): Promise<Order | null> {
    const result = await this.ordersRepository.findOne(id);
    if (!result) {
      throw new GenericError(404, 'Order Not Found');
    }
    return result;
  }

  async create(order: CreateOrderDTO): Promise<Order> {
    const product = await this.apiProductsProvider.getProductDetailsById(order.product_id);
    if (!product) {
      throw new GenericError(422, 'Order was not created because product not found');
    }

    if (product.quantity < order.quantity) {
      throw new GenericError(422, 'Order was not created because product has no stock enough');
    }

    const updatedProduct = new Product(product.id, product.name, product.quantity - order.quantity, product.price);

    const resultUpdatedProduct = await this.apiProductsProvider.updateProductInfo(updatedProduct);

    if (!resultUpdatedProduct) {
      throw new GenericError(422, 'Order was not created because it was not possible to update product stock');
    }

    return this.ordersRepository.save({
      ...order,
      product_name: product.name,
      total_value: product.price * order.quantity,
      status: OrderStatus.CREATED,
    });
  }
}
