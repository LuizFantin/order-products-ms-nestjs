import { Module } from '@nestjs/common';
import { ShippingController } from './controllers/shipping.controller';
import { ShippingProvider } from 'src/providers/shipping/ShippingProvider';

@Module({
  imports: [],
  controllers: [ShippingController],
  providers: [ShippingProvider],
})
export class ShippingModule {}
