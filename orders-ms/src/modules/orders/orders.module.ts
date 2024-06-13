import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.model';
import { OrdersRepository } from '../../providers/repositories/typeorm/OrdersRepository';
import { ApiProductsProvider } from 'src/providers/products_data/ApiProductsProvider';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersRepository, ApiProductsProvider],
})
export class OrdersModule {}
