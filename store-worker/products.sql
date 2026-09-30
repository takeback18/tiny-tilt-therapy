-- Store products. Safe to rerun: existing rows are updated in place.
-- Never change a product id or file id after someone has bought it;
-- purchases and download links point to them.

INSERT INTO products (id, name, description, price_cents, image_url, active)
VALUES (
  'torticollis-hep',
  'Torticollis Home Exercise Program (Left & Right)',
  'Printable home exercise programs with visual tracking activities and stretches. Includes separate left and right torticollis versions, so you can use the one that matches your baby.',
  999,
  '/covers/torticollis-hep.png',
  1
)
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  price_cents = excluded.price_cents,
  image_url = excluded.image_url,
  active = excluded.active;

INSERT INTO product_files (id, product_id, label, r2_key, sort_order)
VALUES
  ('left',  'torticollis-hep', 'Left Torticollis HEP',  'guides/torticollis-hep-left.pdf',  1),
  ('right', 'torticollis-hep', 'Right Torticollis HEP', 'guides/torticollis-hep-right.pdf', 2)
ON CONFLICT(id) DO UPDATE SET
  product_id = excluded.product_id,
  label = excluded.label,
  r2_key = excluded.r2_key,
  sort_order = excluded.sort_order;
