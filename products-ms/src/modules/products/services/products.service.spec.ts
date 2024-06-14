import { ProductsService } from './products.service';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductRepository = {
    save: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    service = new ProductsService(mockProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 10 };
    mockProductRepository.save.mockResolvedValue(product);

    expect(await service.create(product)).toEqual(product);
    expect(mockProductRepository.save).toHaveBeenCalledWith(product);
  });

  it('should return all products', async () => {
    const products: Product[] = [
      { id: 1, name: 'Test Product', price: 100, quantity: 10 },
      { id: 2, name: 'Test Product 2', price: 100, quantity: 10 },
      { id: 3, name: 'Test Product 3', price: 100, quantity: 10 },
      { id: 4, name: 'Test Product 4', price: 100, quantity: 10 },
    ];
    mockProductRepository.findAll.mockResolvedValue(products);

    expect(await service.getAll()).toEqual(products);
    expect(mockProductRepository.findAll).toHaveBeenCalled();
  });

  it('should return a single product', async () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 10 };
    mockProductRepository.findOne.mockResolvedValue(product);

    expect(await service.getOneById(1)).toEqual(product);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a product', async () => {
    const updatedProduct: Product = { id: 1, name: 'Test Product 2', price: 100, quantity: 10 };

    mockProductRepository.save.mockResolvedValue(updatedProduct);
    await service.update(updatedProduct);
    expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);
  });

  it('should delete a product', async () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, quantity: 10 };
    mockProductRepository.delete.mockResolvedValue(product);

    await service.delete(1);
    expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
  });
});
