import { Shipping } from '../models/shipping.model';

export interface IShippingProvider {
  getShippingDetails(customer_cep: string): Promise<Array<Shipping>>;
}
