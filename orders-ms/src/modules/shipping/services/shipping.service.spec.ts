import { GenericError } from '../../../common/errors/GenericError';
import { Shipping } from '../models/shipping.model';
import { ShippingService } from './shipping.service';

describe('ShippingService', () => {
  let service: ShippingService;

  const mockShippingProvider = {
    getShippingDetails: jest.fn(),
  };

  beforeEach(async () => {
    service = new ShippingService(mockShippingProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list shipping quotations', async () => {
    const shipping_list: Shipping[] = [
      {
        company_name: 'Correios',
        service_name: 'PAC',
        estimated_value: 17.39,
        estimated_time: 5,
        estimated_date: '2024-06-18',
      },
      {
        company_name: 'Correios',
        service_name: 'SEDEX',
        estimated_value: 10.07,
        estimated_time: 1,
        estimated_date: '2024-06-14',
      },
    ];

    const customer_cep = '29920000';

    mockShippingProvider.getShippingDetails.mockResolvedValue(shipping_list);

    expect(await service.getShipping(customer_cep)).toEqual(shipping_list);
    expect(mockShippingProvider.getShippingDetails).toHaveBeenCalledWith(customer_cep);
  });

  it('should not list shipping quotations when service is unavailable', async () => {
    const customer_cep = '29920000';

    mockShippingProvider.getShippingDetails.mockResolvedValue(null);

    expect(service.getShipping(customer_cep)).rejects.toBeInstanceOf(GenericError);
    expect(mockShippingProvider.getShippingDetails).toHaveBeenCalledWith(customer_cep);
  });
});
