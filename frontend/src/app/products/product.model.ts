export interface Product {
  id?: string;
  provider: string;
  provider_product_id: string;
  name: string;
  short_description: string | null;
  image_url: string | null;
  price: number | null;
  currency: string | null;
  availability_status: string | null;
  affiliate_url: string;
  raw_provider_payload: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProductSearchResponse {
  query?: string;
  topic?: {
    id: string;
    name: string;
    description: string | null;
    tags: string[] | null;
  };
  count: number;
  results: Product[];
}
