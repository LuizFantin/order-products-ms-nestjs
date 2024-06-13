import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrdersRepository, OrderCreateFields } from '../../../modules/orders/interfaces/IOrdersRepository';
import { Order } from '../../../modules/orders/models/order.model';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async save(order: OrderCreateFields): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
  async findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }
}
