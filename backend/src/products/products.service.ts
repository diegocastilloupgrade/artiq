import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(data);
    return this.productsRepository.save(product);
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    await this.productsRepository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
