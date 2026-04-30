import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Product, ProductSearchResponse } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatDividerModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="product-search-card">
      <mat-card-header>
        <mat-card-title>Búsqueda de productos</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <!-- Search Filters -->
        <div class="search-filters">
          <mat-form-field appearance="outline">
            <mat-label>Palabras clave adicionales</mat-label>
            <input matInput [(ngModel)]="extraKeywords" placeholder="Ej: premium, budget" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Máximo de resultados</mat-label>
            <input matInput type="number" [(ngModel)]="maxResults" min="1" max="50" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Precio mínimo</mat-label>
            <input matInput type="number" [(ngModel)]="minPrice" min="0" step="0.01" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Precio máximo</mat-label>
            <input matInput type="number" [(ngModel)]="maxPrice" min="0" step="0.01" />
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="search()" [disabled]="loading">
            <span *ngIf="!loading">Buscar productos</span>
            <span *ngIf="loading"><mat-spinner diameter="20"></mat-spinner> Buscando...</span>
          </button>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <!-- Error/Success Messages -->
        <p *ngIf="error" class="error-msg">{{ error }}</p>
        <p *ngIf="successMessage" class="ok-msg">{{ successMessage }}</p>

        <!-- Loading State -->
        <div *ngIf="loading" class="spinner-container">
          <mat-spinner diameter="40"></mat-spinner>
        </div>

        <!-- Search Results -->
        <div *ngIf="!loading && searchResults && searchResults.count > 0" class="results">
          <h3>Resultados ({{ searchResults.count }} productos)</h3>
          <div class="product-grid">
            <mat-card *ngFor="let product of searchResults.results" class="product-card">
              <mat-card-header>
                <mat-card-title>{{ product.name }}</mat-card-title>
              </mat-card-header>

              <img
                *ngIf="product.image_url"
                mat-card-image
                [src]="product.image_url"
                [alt]="product.name"
                class="product-image"
              />

              <mat-card-content>
                <p *ngIf="product.short_description" class="product-description">
                  {{ product.short_description }}
                </p>

                <div class="product-meta">
                  <span *ngIf="product.price" class="price">
                    <strong>USD {{ product.price }}</strong>
                  </span>

                  <span *ngIf="product.availability_status" class="availability">
                    {{ product.availability_status }}
                  </span>
                </div>

                <p class="provider-id">
                  <small>ID: {{ product.provider_product_id }}</small>
                </p>
              </mat-card-content>

              <mat-card-actions>
                <a
                  [href]="product.affiliate_url"
                  target="_blank"
                  rel="noopener"
                  mat-stroked-button
                  color="accent"
                >
                  <mat-icon>open_in_new</mat-icon>
                  Ver en Amazon
                </a>
                <button mat-stroked-button (click)="selectProduct(product)">
                  <mat-icon>check_circle</mat-icon>
                  Seleccionar
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>

        <!-- No Results -->
        <p *ngIf="!loading && searchResults && searchResults.count === 0" class="info-msg">
          No se encontraron productos. Intenta con otros términos de búsqueda.
        </p>

        <!-- Selected Product -->
        <div *ngIf="selectedProduct" class="selected-product">
          <mat-divider class="my-4"></mat-divider>
          <h3>Producto seleccionado</h3>
          <mat-card>
            <mat-card-content>
              <div class="selected-layout">
                <img
                  *ngIf="selectedProduct.image_url"
                  [src]="selectedProduct.image_url"
                  [alt]="selectedProduct.name"
                  class="selected-image"
                />
                <div class="selected-info">
                  <h4>{{ selectedProduct.name }}</h4>
                  <p *ngIf="selectedProduct.short_description">
                    {{ selectedProduct.short_description }}
                  </p>
                  <p *ngIf="selectedProduct.price" class="price-highlight">
                    <strong>USD {{ selectedProduct.price }}</strong>
                  </p>
                </div>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="clearSelection()">Cancelar selección</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .product-search-card {
        margin-top: 1rem;
        width: 100%;
      }

      .search-filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 4px;
      }

      .search-filters button {
        align-self: flex-end;
      }

      .my-4 {
        margin: 1.5rem 0;
      }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .product-card {
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .product-image {
        height: 200px;
        object-fit: cover;
      }

      .product-description {
        color: #666;
        font-size: 0.9rem;
        margin: 0.5rem 0;
      }

      .product-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem 0;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .price {
        color: #d32f2f;
        font-size: 1.1rem;
      }

      .availability {
        font-size: 0.85rem;
        padding: 0.25rem 0.5rem;
        background-color: #e8f5e9;
        border-radius: 4px;
        color: #2e7d32;
      }

      .provider-id {
        color: #999;
        margin-top: 0.5rem;
      }

      mat-card-actions {
        padding: 1rem;
        display: flex;
        gap: 0.5rem;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .selected-product {
        margin-top: 1.5rem;
      }

      .selected-layout {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
      }

      .selected-image {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
      }

      .selected-info {
        flex: 1;
      }

      .selected-info h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
      }

      .price-highlight {
        color: #d32f2f;
        font-size: 1.2rem;
        margin-top: 0.5rem;
      }

      .error-msg {
        color: #d32f2f;
        padding: 1rem;
        background-color: #ffebee;
        border-radius: 4px;
      }

      .ok-msg {
        color: #2e7d32;
        padding: 1rem;
        background-color: #e8f5e9;
        border-radius: 4px;
      }

      .info-msg {
        color: #1976d2;
        padding: 1rem;
        background-color: #e3f2fd;
        border-radius: 4px;
      }

      .spinner-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
      }
    `,
  ],
})
export class ProductSearchComponent implements OnInit {
  @Input() topicId: string | null = null;

  private readonly productsService = inject(ProductsService);

  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  extraKeywords = '';
  maxResults = 10;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  searchResults: ProductSearchResponse | null = null;
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    if (this.topicId) {
      this.search();
    }
  }

  search(): void {
    if (!this.topicId) {
      this.error = 'Topic ID no disponible';
      return;
    }

    this.loading = true;
    this.error = null;
    this.successMessage = null;

    const options: any = {
      extraKeywords: this.extraKeywords || undefined,
      maxResults: this.maxResults || undefined,
    };

    if (this.minPrice !== null && this.minPrice >= 0) {
      options.minPrice = this.minPrice;
    }
    if (this.maxPrice !== null && this.maxPrice >= 0) {
      options.maxPrice = this.maxPrice;
    }

    this.productsService.searchByTopic(this.topicId, options).subscribe({
      next: (result: ProductSearchResponse) => {
        this.searchResults = result;
        this.successMessage = `Búsqueda completada: ${result.count} productos encontrados.`;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Search error:', err);
        this.error = 'No se pudo completar la búsqueda. Intenta nuevamente.';
        this.loading = false;
      },
    });
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.successMessage = `Producto "${product.name}" seleccionado.`;
  }

  clearSelection(): void {
    this.selectedProduct = null;
    this.successMessage = null;
  }
}
