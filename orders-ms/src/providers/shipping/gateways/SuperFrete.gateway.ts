import { Shipping } from 'src/modules/shipping/models/shipping.model';

interface Dimensions {
  height: string;
  width: string;
  length: string;
}

interface Package {
  price: number;
  discount: string;
  format: string;
  dimensions: Dimensions;
  weight: string;
  insurance_value: number;
}

interface DeliveryRange {
  min: number;
  max: number;
}

interface AdditionalServices {
  receipt: boolean;
  own_hand: boolean;
}

interface Company {
  id: number;
  name: string;
  picture: string;
}

interface ApiResponse {
  id: number;
  name: string;
  price: number;
  discount: string;
  currency: string;
  delivery_time: number;
  delivery_range: DeliveryRange;
  packages: Package[];
  additional_services: AdditionalServices;
  company: Company;
  has_error: boolean;
}

export class SuperFreteGateway {
  async getShippingQuotation(customer_cep: string): Promise<Array<Shipping>> {
    const url = `${process.env.SUPER_FRETE_BASE_URL}/calculator`;

    try {
      const headers = {
        Authorization: `Bearer ${process.env.SUPER_FRETE_AUTH_TOKEN}`,
        'User-Agent': 'Orders MS',
        accept: 'application/json',
        'content-type': 'application/json',
      };

      const bodyData = {
        from: {
          postal_code: process.env.FROM_CEP,
        },
        to: {
          postal_code: customer_cep,
        },
        services: '1,2,17',
        options: {
          own_hand: false,
          receipt: false,
          insurance_value: 0,
          use_insurance_value: false,
        },
        package: {
          height: 2,
          width: 11,
          length: 16,
          weight: 0.3,
        },
      };

      const body = JSON.stringify(bodyData);

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (response.ok) {
        const data: Array<ApiResponse> = await response.json();
        return data.map((item) => {
          const currentDate = new Date();
          return new Shipping(
            item.company.name,
            item.name,
            item.price,
            item.delivery_time,
            new Date(currentDate.setDate(currentDate.getDate() + item.delivery_time)).toISOString().slice(0, 10),
          );
        });
      } else if (response.status === 400) {
        return null;
      } else {
        console.log(JSON.stringify(response));
        console.log(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}
