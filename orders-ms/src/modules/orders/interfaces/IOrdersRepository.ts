import { Order } from '../models/order.model';

export interface OrderCreateFields {
  product_id: number;
  product_name: string;
  total_value: number;
  quantity: number;
  customer_cep: string;
  status: string;
}

export interface IOrdersRepository {
  findAll(): Promise<Array<Order>>;
  findOne(id: number): Promise<Order | null>;
  save(order: OrderCreateFields): Promise<Order>;
}
