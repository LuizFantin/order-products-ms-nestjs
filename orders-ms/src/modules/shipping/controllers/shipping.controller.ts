import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ShippingService } from '../services/shipping.service';
import { GenericError } from '../../../common/errors/GenericError';
import { ShippingProvider } from 'src/providers/shipping/ShippingProvider';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingProvider: ShippingProvider) {}

  private readonly shippingService = new ShippingService(this.shippingProvider);

  @Get(':customer_cep')
  async getShipping(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const customer_cep = String(req.params.customer_cep);
      const result = await this.shippingService.getShipping(customer_cep);
      return res.status(200).json({ data: result });
    } catch (error: unknown) {
      if (error instanceof GenericError) return res.status(error.status).json({ message: error.message });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
