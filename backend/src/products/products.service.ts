import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductProvider } from './product.entity';
import { AmazonConfig } from './amazon-config.entity';
import { AmazonProviderAdapter, AmazonSearchOptions } from './amazon-provider.adapter';
import { TopicsService } from '../topics/topics.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(AmazonConfig)
    private readonly amazonConfigRepository: Repository<AmazonConfig>,
    private readonly amazonAdapter: AmazonProviderAdapter,
    private readonly topicsService: TopicsService,
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

  /**
   * Search products on Amazon by query
   */
  async searchOnAmazon(
    query: string,
    options?: {
      maxResults?: number;
      minPrice?: number;
      maxPrice?: number;
    },
  ): Promise<Product[]> {
    this.logger.debug(`Searching Amazon for: "${query}"`);

    // Get active Amazon configuration
    const config = await this.getActiveAmazonConfig();
    if (!config) {
      throw new BadRequestException('Amazon configuration not found or not active');
    }

    // Call adapter to search
    const searchOptions: AmazonSearchOptions = {
      query,
      maxResults: options?.maxResults,
      minPrice: options?.minPrice,
      maxPrice: options?.maxPrice,
    };

    const results = await this.amazonAdapter.searchProducts(
      searchOptions,
      config.access_key,
      config.secret_key,
      config.region,
    );

    // Convert adapter results to Product entities
    // Note: These are not saved yet - they're candidate products for the user to select
    const products = results.map((data) =>
      this.productsRepository.create({
        provider: ProductProvider.AMAZON,
        provider_product_id: data.provider_product_id,
        name: data.name,
        short_description: data.short_description || null,
        image_url: data.image_url || null,
        price: data.price || null,
        currency: data.currency || null,
        availability_status: data.availability_status || null,
        affiliate_url: data.affiliate_url,
        raw_provider_payload: data.raw_provider_payload,
      }),
    );

    return products;
  }

  /**
   * Get active Amazon configuration
   */
  private async getActiveAmazonConfig(): Promise<AmazonConfig | null> {
    return this.amazonConfigRepository.findOneBy({ is_active: true });
  }

  /**
   * Set or update Amazon configuration
   */
  async setAmazonConfig(data: {
    name: string;
    access_key: string;
    secret_key: string;
    region?: string;
    associate_tag?: string;
    partner_id?: string;
    additional_config?: Record<string, unknown>;
  }): Promise<AmazonConfig> {
    // Deactivate previous config if exists
    await this.amazonConfigRepository.update({ is_active: true }, { is_active: false });

    // Create new config
    const config = this.amazonConfigRepository.create(data);
    return this.amazonConfigRepository.save(config);
  }

  /**
   * Search products for a given topic
   * Combines topic name and keywords for search
   */
  async searchProductsForTopic(
    topicId: string,
    options?: {
      extraKeywords?: string;
      maxResults?: number;
      minPrice?: number;
      maxPrice?: number;
    },
  ): Promise<{ topic: any; products: Product[] }> {
    // Get the topic
    const topic = await this.topicsService.findOne(topicId);
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    // Build search query: topic name + extra keywords + tags
    let searchQuery = topic.name;
    if (options?.extraKeywords) {
      searchQuery += ` ${options.extraKeywords}`;
    }
    if (topic.tags && topic.tags.length > 0) {
      searchQuery += ` ${topic.tags.join(' ')}`;
    }

    this.logger.debug(`Searching products for topic "${topic.name}": "${searchQuery}"`);

    // Search products
    const products = await this.searchOnAmazon(searchQuery, {
      maxResults: options?.maxResults,
      minPrice: options?.minPrice,
      maxPrice: options?.maxPrice,
    });

    return {
      topic: {
        id: topic.id,
        name: topic.name,
        description: topic.description,
        tags: topic.tags,
      },
      products,
    };
  }
}
