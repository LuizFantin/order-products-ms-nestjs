import { IShippingProvider } from 'src/modules/shipping/interfaces/IShippingProvider';
import { SuperFreteGateway } from './gateways/SuperFrete.gateway';
import { Shipping } from 'src/modules/shipping/models/shipping.model';

export class ShippingProvider implements IShippingProvider {
  private readonly shippingGateway: SuperFreteGateway;
  constructor() {
    this.shippingGateway = new SuperFreteGateway();
  }
  async getShippingDetails(customer_cep: string): Promise<Array<Shipping>> {
    return this.shippingGateway.getShippingQuotation(customer_cep);
  }
}
