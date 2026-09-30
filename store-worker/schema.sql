-- No user accounts. A purchase is tied to the email the buyer entered at
-- Stripe Checkout, and its download_token is what the emailed links use.

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  active INTEGER NOT NULL DEFAULT 1
);

-- The downloadable files a product includes. One purchase unlocks every file
-- for that product. The id is used in download URLs, so keep it stable.
CREATE TABLE IF NOT EXISTS product_files (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id),
  label TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_product_files_product_id ON product_files(product_id);

CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  product_id TEXT NOT NULL REFERENCES products(id),
  stripe_session_id TEXT NOT NULL UNIQUE,
  download_token TEXT NOT NULL UNIQUE,
  delivered_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);
