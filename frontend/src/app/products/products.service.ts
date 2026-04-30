import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductSearchResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/products';

  /**
   * Search products on Amazon by query
   */
  searchByQuery(
    query: string,
    options?: {
      maxResults?: number;
      minPrice?: number;
      maxPrice?: number;
    },
  ): Observable<ProductSearchResponse> {
    let params = new HttpParams().set('query', query);
    if (options?.maxResults) {
      params = params.set('maxResults', options.maxResults.toString());
    }
    if (options?.minPrice !== undefined) {
      params = params.set('minPrice', options.minPrice.toString());
    }
    if (options?.maxPrice !== undefined) {
      params = params.set('maxPrice', options.maxPrice.toString());
    }

    return this.http.post<ProductSearchResponse>(`${this.apiUrl}/search`, null, { params });
  }

  /**
   * Search products for a specific topic
   */
  searchByTopic(
    topicId: string,
    options?: {
      extraKeywords?: string;
      maxResults?: number;
      minPrice?: number;
      maxPrice?: number;
    },
  ): Observable<ProductSearchResponse> {
    let params = new HttpParams();
    if (options?.extraKeywords) {
      params = params.set('extraKeywords', options.extraKeywords);
    }
    if (options?.maxResults) {
      params = params.set('maxResults', options.maxResults.toString());
    }
    if (options?.minPrice !== undefined) {
      params = params.set('minPrice', options.minPrice.toString());
    }
    if (options?.maxPrice !== undefined) {
      params = params.set('maxPrice', options.maxPrice.toString());
    }

    return this.http.post<ProductSearchResponse>(`${this.apiUrl}/search-by-topic/${topicId}`, null, { params });
  }

  /**
   * Get all saved products
   */
  findAll(): Observable<{ count: number; data: Product[] }> {
    return this.http.get<{ count: number; data: Product[] }>(`${this.apiUrl}`);
  }

  /**
   * Configure Amazon affiliate provider
   */
  configureAmazon(config: {
    name: string;
    access_key: string;
    secret_key: string;
    region?: string;
    associate_tag?: string;
    partner_id?: string;
    additional_config?: Record<string, unknown>;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/config/amazon`, config);
  }
}
