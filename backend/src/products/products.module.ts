import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { AmazonConfig } from './amazon-config.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AmazonProviderAdapter } from './amazon-provider.adapter';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, AmazonConfig]), TopicsModule],
  providers: [ProductsService, AmazonProviderAdapter],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
