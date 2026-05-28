#!/usr/bin/env node
/**
 * sync-resources.js — Refresh src/data/resources.ts from Amazon PA API
 *
 * Setup:
 *   1. Apply for PA API access at affiliate-program.amazon.com → Tools → Product Advertising API
 *   2. Create a .env file in the project root:
 *        PA_API_ACCESS_KEY=your_access_key
 *        PA_API_SECRET_KEY=your_secret_key
 *        PA_API_PARTNER_TAG=tinytilt-20
 *   3. Add/remove items in scripts/asins.json
 *   4. Run: node scripts/sync-resources.js
 */

import crypto from 'crypto'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Load .env manually (no dependency needed)
try {
  const env = readFileSync(join(ROOT, '.env'), 'utf-8')
  for (const line of env.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (key && !process.env[key]) process.env[key] = val
  }
} catch { /* no .env file — rely on environment */ }

const ACCESS_KEY  = process.env.PA_API_ACCESS_KEY
const SECRET_KEY  = process.env.PA_API_SECRET_KEY
const PARTNER_TAG = process.env.PA_API_PARTNER_TAG || 'tinytilt-20'
const HOST        = 'webservices.amazon.com'
const PATH        = '/paapi5/getitems'
const REGION      = 'us-east-1'
const SERVICE     = 'ProductAdvertisingAPI'

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error('❌  Missing PA_API_ACCESS_KEY or PA_API_SECRET_KEY in environment / .env')
  process.exit(1)
}

// ── AWS Signature V4 ──────────────────────────────────────────────────────────

function hmac(key, data, encoding = undefined) {
  return crypto.createHmac('sha256', key).update(data, 'utf-8').digest(encoding)
}

function sha256hex(data) {
  return crypto.createHash('sha256').update(data, 'utf-8').digest('hex')
}

function buildHeaders(body) {
  const now     = new Date()
  const amzDate = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')  // 20240101T120000Z
  const datestamp = amzDate.slice(0, 8)

  const target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems'

  // Canonical request
  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:application/json; charset=UTF-8\n` +
    `host:${HOST}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${target}\n`

  const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target'

  const canonicalRequest = [
    'POST',
    PATH,
    '',  // no query string
    canonicalHeaders,
    signedHeaders,
    sha256hex(body),
  ].join('\n')

  // String to sign
  const credentialScope = `${datestamp}/${REGION}/${SERVICE}/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256hex(canonicalRequest),
  ].join('\n')

  // Signing key
  const kDate    = hmac('AWS4' + SECRET_KEY, datestamp)
  const kRegion  = hmac(kDate, REGION)
  const kService = hmac(kRegion, SERVICE)
  const kSigning = hmac(kService, 'aws4_request')
  const signature = hmac(kSigning, stringToSign, 'hex')

  return {
    'Authorization':    `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    'Content-Encoding': 'amz-1.0',
    'Content-Type':     'application/json; charset=UTF-8',
    'Host':              HOST,
    'X-Amz-Date':        amzDate,
    'X-Amz-Target':      target,
  }
}

// ── PA API call ───────────────────────────────────────────────────────────────

async function getItems(asins) {
  const body = JSON.stringify({
    ItemIds:     asins,
    PartnerTag:  PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
    Resources: [
      'ItemInfo.Title',
      'ItemInfo.Features',
      'Images.Primary.Large',
    ],
  })

  const res = await fetch(`https://${HOST}${PATH}`, {
    method:  'POST',
    headers: buildHeaders(body),
    body,
  })

  const json = await res.json()

  if (!res.ok) {
    const msg = json?.Errors?.[0]?.Message ?? res.statusText
    throw new Error(`PA API ${res.status}: ${msg}`)
  }

  return json
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function buildDescription(item) {
  const bullets = item.ItemInfo?.Features?.DisplayValues
  if (bullets?.length) {
    const text = bullets.slice(0, 2).join(' ').replace(/\s+/g, ' ').trim()
    return text.length > 240 ? text.slice(0, 237) + '...' : text
  }
  return item.ItemInfo?.Title?.DisplayValue ?? ''
}

function escapeForTs(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

// ── Category ordering ─────────────────────────────────────────────────────────

const CATEGORY_ORDER = [
  'Baby Care Items',
  'Baby Containers',
  'Baby Feeding',
  'Baby Safety',
  'Baby Toys',
  'Nursing and Pumping',
  'Toddler Toys',
]

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const config = JSON.parse(readFileSync(join(__dirname, 'asins.json'), 'utf-8'))
  console.log(`\nSyncing ${config.length} items from Amazon PA API...\n`)

  const results = []
  const batches  = chunk(config, 10)

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    const asins = batch.map(a => a.asin)
    process.stdout.write(`  Batch ${i + 1}/${batches.length}: ${asins.join(', ')} ... `)

    try {
      const data    = await getItems(asins)
      const itemMap = {}
      for (const item of (data.ItemsResult?.Items ?? [])) {
        itemMap[item.ASIN] = item
      }

      for (const { asin, category, href } of batch) {
        const item = itemMap[asin]
        if (!item) {
          console.warn(`\n  ⚠  Not found: ${asin} — skipped`)
          continue
        }
        results.push({
          category,
          name:        item.ItemInfo?.Title?.DisplayValue ?? asin,
          description: buildDescription(item),
          href:        href ?? `https://www.amazon.com/dp/${asin}?tag=${PARTNER_TAG}`,
          image:       item.Images?.Primary?.Large?.URL ?? '',
        })
      }
      console.log('✓')
    } catch (err) {
      console.error(`\n  ✗ ${err.message}`)
    }

    // PA API rate limit is ~1 req/s
    if (i < batches.length - 1) await new Promise(r => setTimeout(r, 1100))
  }

  // Sort by category order, then name
  results.sort((a, b) => {
    const ci = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    return ci !== 0 ? ci : a.name.localeCompare(b.name)
  })

  // Build TypeScript file
  const entries = results.map(r => `  {
    category: '${escapeForTs(r.category)}',
    name: '${escapeForTs(r.name)}',
    description: '${escapeForTs(r.description)}',
    href: '${r.href}',
    image: '${r.image}',
  }`).join(',\n')

  const output = `// AUTO-GENERATED — do not edit by hand.
// Edit scripts/asins.json, then run: node scripts/sync-resources.js
// Last synced: ${new Date().toISOString()}

export const CATEGORIES = [
  'Baby Care Items',
  'Baby Containers',
  'Baby Feeding',
  'Baby Safety',
  'Baby Toys',
  'Nursing and Pumping',
  'Toddler Toys',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Resource {
  category: Category
  name: string
  description: string
  href: string
  image?: string
}

export const resources: Resource[] = [
${entries}
]
`

  const outPath = join(ROOT, 'src/data/resources.ts')
  writeFileSync(outPath, output, 'utf-8')
  console.log(`\n✓ Wrote ${results.length} items → src/data/resources.ts\n`)
}

main().catch(err => {
  console.error('\n❌', err.message)
  process.exit(1)
})
