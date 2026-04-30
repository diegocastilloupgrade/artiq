import { Injectable, BadRequestException, Logger } from '@nestjs/common';

export interface AmazonSearchOptions {
  query: string;
  maxResults?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface AmazonProductData {
  provider_product_id: string;
  name: string;
  short_description?: string;
  image_url?: string;
  price?: number;
  currency?: string;
  availability_status?: string;
  affiliate_url: string;
  raw_provider_payload: Record<string, unknown>;
}

/**
 * AmazonProviderAdapter
 * 
 * Handles integration with Amazon Product Advertising API
 * Searches for products and normalizes responses to internal Product model
 */
@Injectable()
export class AmazonProviderAdapter {
  private readonly logger = new Logger(AmazonProviderAdapter.name);

  /**
   * Search products on Amazon
   * 
   * In MVP: stub implementation that returns mock data
   * In production: use AWS SDK for Product Advertising API
   */
  async searchProducts(
    options: AmazonSearchOptions,
    accessKey: string,
    secretKey: string,
    region: string,
  ): Promise<AmazonProductData[]> {
    if (!options.query || options.query.trim().length === 0) {
      throw new BadRequestException('Search query cannot be empty');
    }

    if (!accessKey || !secretKey) {
      throw new BadRequestException('Amazon credentials not configured');
    }

    this.logger.debug(`Searching Amazon for: "${options.query}" in region ${region}`);

    // MVP STUB: Return mock data
    // TODO: Integrate with AWS Product Advertising API v5
    return this.mockSearchResults(options);
  }

  /**
   * Get product details from Amazon
   */
  async getProductById(
    providerProductId: string,
    accessKey: string,
    secretKey: string,
    region: string,
  ): Promise<AmazonProductData | null> {
    if (!accessKey || !secretKey) {
      throw new BadRequestException('Amazon credentials not configured');
    }

    this.logger.debug(`Fetching Amazon product: ${providerProductId}`);

    // MVP STUB: Return mock data
    // TODO: Integrate with AWS Product Advertising API v5
    return this.mockGetProduct(providerProductId);
  }

  /**
   * Mock search results for MVP
   * In production: replace with actual API calls
   */
  private mockSearchResults(options: AmazonSearchOptions): AmazonProductData[] {
    const mockProducts: AmazonProductData[] = [
      {
        provider_product_id: 'ASIN001',
        name: `Premium ${options.query} - Professional Edition`,
        short_description: `High-quality ${options.query} with advanced features for professional use.`,
        image_url: 'https://via.placeholder.com/300x300?text=Product+1',
        price: 129.99,
        currency: 'USD',
        availability_status: 'In Stock',
        affiliate_url: 'https://amazon.com/dp/ASIN001?tag=affiliate',
        raw_provider_payload: {
          ASIN: 'ASIN001',
          Title: `Premium ${options.query} - Professional Edition`,
          Price: '129.99',
        },
      },
      {
        provider_product_id: 'ASIN002',
        name: `Budget ${options.query} - Starter Kit`,
        short_description: `Affordable ${options.query} perfect for beginners and enthusiasts.`,
        image_url: 'https://via.placeholder.com/300x300?text=Product+2',
        price: 49.99,
        currency: 'USD',
        availability_status: 'In Stock',
        affiliate_url: 'https://amazon.com/dp/ASIN002?tag=affiliate',
        raw_provider_payload: {
          ASIN: 'ASIN002',
          Title: `Budget ${options.query} - Starter Kit`,
          Price: '49.99',
        },
      },
      {
        provider_product_id: 'ASIN003',
        name: `Deluxe ${options.query} - Complete Package`,
        short_description: `Ultimate ${options.query} solution with all accessories included.`,
        image_url: 'https://via.placeholder.com/300x300?text=Product+3',
        price: 249.99,
        currency: 'USD',
        availability_status: 'In Stock',
        affiliate_url: 'https://amazon.com/dp/ASIN003?tag=affiliate',
        raw_provider_payload: {
          ASIN: 'ASIN003',
          Title: `Deluxe ${options.query} - Complete Package`,
          Price: '249.99',
        },
      },
    ];

    // Filter by price range if provided
    let results = mockProducts;
    if (options.minPrice !== undefined) {
      const minPrice = options.minPrice;
      results = results.filter((p) => (p.price || 0) >= minPrice);
    }
    if (options.maxPrice !== undefined) {
      const maxPrice = options.maxPrice;
      results = results.filter((p) => (p.price || 0) <= maxPrice);
    }

    // Limit results
    const maxResults = options.maxResults || 10;
    return results.slice(0, maxResults);
  }

  /**
   * Mock get product details
   */
  private mockGetProduct(providerProductId: string): AmazonProductData | null {
    const mockMap: Record<string, AmazonProductData> = {
      ASIN001: {
        provider_product_id: 'ASIN001',
        name: 'Premium Product - Professional Edition',
        short_description: 'High-quality product with advanced features for professional use.',
        image_url: 'https://via.placeholder.com/300x300?text=Product+1',
        price: 129.99,
        currency: 'USD',
        availability_status: 'In Stock',
        affiliate_url: 'https://amazon.com/dp/ASIN001?tag=affiliate',
        raw_provider_payload: {
          ASIN: 'ASIN001',
          Title: 'Premium Product - Professional Edition',
          Price: '129.99',
        },
      },
      ASIN002: {
        provider_product_id: 'ASIN002',
        name: 'Budget Product - Starter Kit',
        short_description: 'Affordable product perfect for beginners and enthusiasts.',
        image_url: 'https://via.placeholder.com/300x300?text=Product+2',
        price: 49.99,
        currency: 'USD',
        availability_status: 'In Stock',
        affiliate_url: 'https://amazon.com/dp/ASIN002?tag=affiliate',
        raw_provider_payload: {
          ASIN: 'ASIN002',
          Title: 'Budget Product - Starter Kit',
          Price: '49.99',
        },
      },
    };

    return mockMap[providerProductId] || null;
  }
}
