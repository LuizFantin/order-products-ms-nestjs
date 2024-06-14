import { Injectable } from '@nestjs/common';

import { IShippingProvider } from '../interfaces/IShippingProvider';
import { GenericError } from '../../../common/errors/GenericError';
import { Shipping } from '../models/shipping.model';

@Injectable()
export class ShippingService {
  constructor(private shippingProvider: IShippingProvider) {}

  async getShipping(customer_cep: string): Promise<Array<Shipping>> {
    const result = await this.shippingProvider.getShippingDetails(customer_cep);
    if (!result) {
      throw new GenericError(404, 'No Shipping Services were found');
    }
    return result;
  }
}
