import { OrderStatus } from '../../../common/const/orderStatus';
import { Order } from '../models/order.model';
import { OrdersService } from './orders.service';
import { Product } from '../models/product.model';
import { GenericError } from '../../../common/errors/GenericError';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockApiProductsProvider = {
    getProductDetailsById: jest.fn(),
    updateProductInfo: jest.fn(),
  };

  const mockOrdersRepository = {
    save: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    service = new OrdersService(mockOrdersRepository, mockApiProductsProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const order: Order = {
      id: 1,
      product_name: 'Test Product',
      status: OrderStatus.CREATED,
      product_id: 1,
      customer_cep: '29920000',
      created_at: new Date(),
      total_value: 100,
      quantity: 1,
    };

    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 10 };

    mockOrdersRepository.save.mockResolvedValue(order);
    mockApiProductsProvider.getProductDetailsById.mockResolvedValue(product);
    mockApiProductsProvider.updateProductInfo.mockResolvedValue({
      ...product,
      quantity: product.quantity - order.quantity,
    });

    expect(await service.create(order)).toEqual(order);
    expect(mockOrdersRepository.save).toHaveBeenCalledWith(order);
    expect(mockApiProductsProvider.getProductDetailsById).toHaveBeenCalledWith(product.id);
    expect(mockApiProductsProvider.updateProductInfo).toHaveBeenCalledWith({
      ...product,
      quantity: product.quantity - order.quantity,
    });
  });

  it('should not create an order when product not found', async () => {
    const order: Order = {
      id: 1,
      product_name: 'Test Product',
      status: OrderStatus.CREATED,
      product_id: 1,
      customer_cep: '29920000',
      created_at: new Date(),
      total_value: 100,
      quantity: 1,
    };

    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 10 };

    mockOrdersRepository.save.mockResolvedValue(order);
    mockApiProductsProvider.getProductDetailsById.mockResolvedValue(null);

    expect(service.create(order)).rejects.toBeInstanceOf(GenericError);
    expect(mockApiProductsProvider.getProductDetailsById).toHaveBeenCalledWith(product.id);
  });

  it('should not create an order when product has no stock', async () => {
    const order: Order = {
      id: 1,
      product_name: 'Test Product',
      status: OrderStatus.CREATED,
      product_id: 1,
      customer_cep: '29920000',
      created_at: new Date(),
      total_value: 100,
      quantity: 10,
    };

    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 5 };

    mockOrdersRepository.save.mockResolvedValue(order);
    mockApiProductsProvider.getProductDetailsById.mockResolvedValue(product);

    expect(service.create(order)).rejects.toBeInstanceOf(GenericError);
    expect(mockApiProductsProvider.getProductDetailsById).toHaveBeenCalledWith(product.id);
  });

  it('should not create an order when its not possible to update product stock', async () => {
    const order: Order = {
      id: 1,
      product_name: 'Test Product',
      status: OrderStatus.CREATED,
      product_id: 1,
      customer_cep: '29920000',
      created_at: new Date(),
      total_value: 100,
      quantity: 10,
    };

    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 10 };

    mockOrdersRepository.save.mockResolvedValue(order);
    mockApiProductsProvider.getProductDetailsById.mockResolvedValue(product);
    mockApiProductsProvider.updateProductInfo.mockResolvedValue(null);

    expect(service.create(order)).rejects.toBeInstanceOf(GenericError);
    expect(mockApiProductsProvider.getProductDetailsById).toHaveBeenCalledWith(product.id);
  });

  it('should return all orders', async () => {
    const orders: Order[] = [
      {
        id: 1,
        product_name: 'Test Product',
        status: OrderStatus.CREATED,
        product_id: 1,
        customer_cep: '29920000',
        created_at: new Date(),
        total_value: 100,
        quantity: 10,
      },
      {
        id: 2,
        product_name: 'Test Product 2',
        status: OrderStatus.CREATED,
        product_id: 1,
        customer_cep: '29920000',
        created_at: new Date(),
        total_value: 100,
        quantity: 10,
      },
    ];
    mockOrdersRepository.findAll.mockResolvedValue(orders);

    expect(await service.getAll()).toEqual(orders);
    expect(mockOrdersRepository.findAll).toHaveBeenCalled();
  });

  it('should return a single order', async () => {
    const order: Order = {
      id: 1,
      product_name: 'Test Product',
      status: OrderStatus.CREATED,
      product_id: 1,
      customer_cep: '29920000',
      created_at: new Date(),
      total_value: 100,
      quantity: 10,
    };
    mockOrdersRepository.findOne.mockResolvedValue(order);

    expect(await service.getOneById(1)).toEqual(order);
    expect(mockOrdersRepository.findOne).toHaveBeenCalledWith(1);
  });
});
