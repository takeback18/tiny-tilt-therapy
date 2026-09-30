export interface Env {
  DB: D1Database;
  PDFS: R2Bucket;
  ENVIRONMENT: string;
  SITE_URL: string;
  API_URL: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
}

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string | null;
  active: number;
}

export interface ProductFileRow {
  id: string;
  product_id: string;
  label: string;
  r2_key: string;
  sort_order: number;
}

export interface PurchaseRow {
  id: string;
  email: string;
  product_id: string;
  stripe_session_id: string;
  download_token: string;
  delivered_at: string | null;
  created_at: string;
}
