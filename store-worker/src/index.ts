import Stripe from "stripe";
import type { Env, ProductFileRow, ProductRow, PurchaseRow } from "./types";
import { sendDeliveryEmail, type DeliveryItem } from "./email";

// No accounts or logins. Buyers pay through Stripe Checkout (which collects
// their email), the webhook records the purchase and emails the files, and
// each purchase gets a random download token that the emailed links use.

const ALLOWED_ORIGINS = ["https://tinytilttherapy.com", "http://localhost:5173"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function jsonResponse(request: Request, data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(request), "Content-Type": "application/json" },
  });
}

function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, remoteip: ip ?? undefined }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

function getStripe(env: Env): Stripe {
  return new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });
}

// Builds the email contents (product names + per-file download URLs) for a set
// of purchases. `apiOrigin` is this worker's public URL (env.API_URL): https://api.tinytilttherapy.com
// live, http://localhost:8787 locally. Don't derive it from request.url: under `wrangler dev`
// that reports the production route's host, which would put live-site links in local emails.
async function buildDeliveryItems(env: Env, purchases: PurchaseRow[], apiOrigin: string): Promise<DeliveryItem[]> {
  const items: DeliveryItem[] = [];
  for (const purchase of purchases) {
    const [product, files] = await Promise.all([
      env.DB.prepare("SELECT * FROM products WHERE id = ?").bind(purchase.product_id).first<ProductRow>(),
      env.DB.prepare("SELECT * FROM product_files WHERE product_id = ? ORDER BY sort_order, label")
        .bind(purchase.product_id)
        .all<ProductFileRow>(),
    ]);
    if (!product) continue;
    items.push({
      productName: product.name,
      files: files.results.map((f) => ({
        label: f.label,
        url: `${apiOrigin}/download/${encodeURIComponent(purchase.download_token)}/${encodeURIComponent(f.id)}`,
      })),
    });
  }
  return items;
}

// Resend fetches attachments from our download URLs, which it can't do for localhost.
function canAttach(env: Env): boolean {
  return env.ENVIRONMENT !== "development";
}

// ---- products / checkout ----

async function handleListProducts(request: Request, env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    "SELECT id, name, description, price_cents, image_url FROM products WHERE active = 1",
  ).all();
  return jsonResponse(request, { products: results });
}

async function handleCheckout(request: Request, env: Env, productId: string): Promise<Response> {
  const product = await env.DB.prepare("SELECT * FROM products WHERE id = ? AND active = 1")
    .bind(productId)
    .first<ProductRow>();
  if (!product) return jsonResponse(request, { error: "Product not found" }, 404);

  const stripe = getStripe(env);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.price_cents,
        },
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    metadata: { product_id: product.id },
    success_url: `${env.SITE_URL}/store?purchase=success`,
    cancel_url: `${env.SITE_URL}/store`,
  });

  return jsonResponse(request, { url: session.url });
}

async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return jsonResponse(request, { error: "Missing signature" }, 400);

  const body = await request.text();
  const stripe = getStripe(env);

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return jsonResponse(request, { error: "Invalid signature" }, 400);
  }

  if (event.type !== "checkout.session.completed") return jsonResponse(request, { received: true });

  const session = event.data.object as Stripe.Checkout.Session;
  const productId = session.metadata?.product_id;
  const email = (session.customer_details?.email ?? session.customer_email ?? "").toLowerCase();

  if (session.payment_status !== "paid" || !productId || !email) {
    console.warn("Skipping checkout session", session.id, session.payment_status, productId, Boolean(email));
    return jsonResponse(request, { received: true });
  }

  // Stripe can deliver the same event more than once; stripe_session_id is unique,
  // so a redelivery finds the existing row instead of creating a second one.
  await env.DB.prepare(
    `INSERT INTO purchases (id, email, product_id, stripe_session_id, download_token) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(stripe_session_id) DO NOTHING`,
  )
    .bind(crypto.randomUUID(), email, productId, session.id, generateToken())
    .run();

  const purchase = await env.DB.prepare("SELECT * FROM purchases WHERE stripe_session_id = ?")
    .bind(session.id)
    .first<PurchaseRow>();
  if (!purchase || purchase.delivered_at) return jsonResponse(request, { received: true });

  // If the email fails, return 500 so Stripe retries the webhook later;
  // delivered_at stays empty until a send succeeds.
  try {
    const items = await buildDeliveryItems(env, [purchase], env.API_URL);
    await sendDeliveryEmail(env, email, items, { isResend: false, attach: canAttach(env) });
  } catch (err) {
    console.error("Failed to send delivery email for", session.id, err);
    return jsonResponse(request, { error: "Email failed" }, 500);
  }

  await env.DB.prepare("UPDATE purchases SET delivered_at = datetime('now') WHERE id = ?").bind(purchase.id).run();
  return jsonResponse(request, { received: true });
}

// ---- resend ----

async function handleResendDownloads(request: Request, env: Env): Promise<Response> {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 320) : "";
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  if (!EMAIL_RE.test(email)) return jsonResponse(request, { error: "Invalid email address" }, 400);
  if (!turnstileToken) return jsonResponse(request, { error: "CAPTCHA token missing." }, 400);

  const ok = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET, request.headers.get("CF-Connecting-IP"));
  if (!ok) return jsonResponse(request, { error: "CAPTCHA verification failed. Please try again." }, 400);

  // One entry per product, even if they bought it more than once.
  const { results } = await env.DB.prepare(
    "SELECT * FROM purchases WHERE email = ? ORDER BY created_at DESC",
  )
    .bind(email)
    .all<PurchaseRow>();
  const seen = new Set<string>();
  const purchases = results.filter((p) => (seen.has(p.product_id) ? false : (seen.add(p.product_id), true)));

  // Same response whether or not the email has purchases, so this form can't be
  // used to find out who has bought from the store.
  if (purchases.length > 0) {
    try {
      const items = await buildDeliveryItems(env, purchases, env.API_URL);
      await sendDeliveryEmail(env, email, items, { isResend: true, attach: canAttach(env) });
    } catch (err) {
      console.error("Failed to resend downloads:", err);
      return jsonResponse(request, { error: "Could not send the email. Please try again." }, 500);
    }
  }

  return jsonResponse(request, { ok: true });
}

// ---- downloads ----

async function handleDownload(request: Request, env: Env, token: string, fileId: string): Promise<Response> {
  const purchase = await env.DB.prepare("SELECT * FROM purchases WHERE download_token = ?")
    .bind(token)
    .first<PurchaseRow>();
  if (!purchase) return new Response("This download link isn't valid.", { status: 404 });

  // Match on product_id too, so a token for one product never unlocks another product's files.
  const file = await env.DB.prepare("SELECT * FROM product_files WHERE id = ? AND product_id = ?")
    .bind(fileId, purchase.product_id)
    .first<ProductFileRow>();
  if (!file) return new Response("File not found.", { status: 404 });

  const object = await env.PDFS.get(file.r2_key);
  if (!object) return new Response("File not found.", { status: 404 });

  const safeName = file.label.replace(/[^a-z0-9 _-]/gi, "").trim() || "download";
  return new Response(object.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeName}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}

// ---- router ----

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request) });
    }

    try {
      if (pathname === "/products" && request.method === "GET") return await handleListProducts(request, env);
      if (pathname.startsWith("/checkout/") && request.method === "POST")
        return await handleCheckout(request, env, decodeURIComponent(pathname.slice("/checkout/".length)));
      if (pathname === "/webhooks/stripe" && request.method === "POST")
        return await handleStripeWebhook(request, env);
      if (pathname === "/resend-downloads" && request.method === "POST")
        return await handleResendDownloads(request, env);
      if (pathname.startsWith("/download/") && request.method === "GET") {
        const [token, fileId] = pathname.slice("/download/".length).split("/").map(decodeURIComponent);
        if (token && fileId) return await handleDownload(request, env, token, fileId);
      }

      return jsonResponse(request, { error: "Not found" }, 404);
    } catch (err) {
      console.error("Unhandled error:", err);
      return jsonResponse(request, { error: "Something went wrong" }, 500);
    }
  },
};
