import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Search products on Amazon
   * POST /products/search?query=<query>&maxResults=<n>&minPrice=<p>&maxPrice=<p>
   */
  @Post('search')
  @Roles(UserRole.ADMIN, UserRole.REDACTOR)
  async searchProducts(
    @Query('query') query?: string,
    @Query('maxResults') maxResults?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Search query is required');
    }

    const products = await this.productsService.searchOnAmazon(query, {
      maxResults: maxResults ? parseInt(maxResults, 10) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });

    return {
      query,
      count: products.length,
      results: products,
    };
  }

  /**
   * Search products for a specific topic
   * POST /products/search-by-topic/:topicId?extraKeywords=<keywords>&maxResults=<n>
   */
  @Post('search-by-topic/:topicId')
  @Roles(UserRole.ADMIN, UserRole.REDACTOR)
  async searchProductsForTopic(
    @Query('topicId') topicId?: string,
    @Query('extraKeywords') extraKeywords?: string,
    @Query('maxResults') maxResults?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    if (!topicId || topicId.trim().length === 0) {
      throw new BadRequestException('Topic ID is required');
    }

    const result = await this.productsService.searchProductsForTopic(topicId, {
      extraKeywords,
      maxResults: maxResults ? parseInt(maxResults, 10) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });

    return {
      ...result,
      count: result.products.length,
    };
  }

  /**
   * Configure Amazon affiliate provider (ADMIN only)
   * POST /products/config/amazon
   */
  @Post('config/amazon')
  @Roles(UserRole.ADMIN)
  async configureAmazon(
    @Body()
    data: {
      name: string;
      access_key: string;
      secret_key: string;
      region?: string;
      associate_tag?: string;
      partner_id?: string;
      additional_config?: Record<string, unknown>;
    },
  ) {
    if (!data.access_key || !data.secret_key) {
      throw new BadRequestException('access_key and secret_key are required');
    }

    const config = await this.productsService.setAmazonConfig(data);
    return {
      success: true,
      message: 'Amazon configuration updated',
      config: {
        id: config.id,
        name: config.name,
        region: config.region,
        associate_tag: config.associate_tag,
        partner_id: config.partner_id,
        is_active: config.is_active,
      },
    };
  }

  /**
   * Get all products
   */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.REDACTOR)
  async findAll() {
    const products = await this.productsService.findAll();
    return {
      count: products.length,
      data: products,
    };
  }

  /**
   * Get product by ID
   */
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.REDACTOR)
  async findOne(@Query('id') id: string) {
    if (!id) {
      throw new BadRequestException('Product ID is required');
    }

    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
