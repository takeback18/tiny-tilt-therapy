import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { STORE_WORKER_URL, isStoreUnlocked } from '../storeConfig'

// Same products and checkout as the Store page (GET /products, POST /checkout/:id).
// After paying, Stripe sends buyers to /store?purchase=success like any other purchase.

interface Product {
  id: string
  name: string
  description: string
  price_cents: number
  image_url: string | null
}

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default function GiftGuideShop() {
  const enabled = Boolean(STORE_WORKER_URL) && isStoreUnlocked()
  const [products, setProducts] = useState<Product[]>([])
  const [buyingId, setBuyingId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!enabled) return
    fetch(`${STORE_WORKER_URL}/products`)
      .then((res) => res.json() as Promise<{ products?: Product[] }>)
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([])) // Store unreachable: just leave the section out.
  }, [enabled])

  async function handleBuy(product: Product) {
    setBuyingId(product.id)
    setErrorMsg('')
    try {
      const res = await fetch(`${STORE_WORKER_URL}/checkout/${product.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Could not start checkout')
      window.location.assign(data.url)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not start checkout')
      setBuyingId(null)
    }
  }

  if (!enabled || products.length === 0) return null

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <span className="inline-block bg-warm-200 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
          From Our Shop
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Guides Made by Our Therapists</h2>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          Downloadable PDF guides, emailed right after purchase. A helpful add-on for new parents.
        </p>
      </div>

      {errorMsg && <p className="text-center text-sm text-red-500 mb-6">{errorMsg}</p>}

      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white rounded-2xl border-2 border-sage-100 shadow-sm overflow-hidden flex flex-col"
          >
            {product.image_url && (
              <button
                type="button"
                onClick={() => handleBuy(product)}
                disabled={buyingId === product.id}
                tabIndex={-1}
                aria-hidden="true"
                className="block disabled:cursor-wait"
              >
                <img
                  src={product.image_url}
                  alt=""
                  loading="lazy"
                  className="w-full h-56 object-contain bg-gray-50"
                />
              </button>
            )}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-sage-600">{formatPrice(product.price_cents)}</span>
                <button
                  type="button"
                  onClick={() => handleBuy(product)}
                  disabled={buyingId === product.id}
                  className="inline-flex items-center gap-2 bg-sage-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FiShoppingBag size={16} />
                  {buyingId === product.id ? 'Redirecting…' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already bought a guide?{' '}
        <Link to="/downloads" className="text-sage-600 font-medium hover:underline underline-offset-2">
          Resend my downloads
        </Link>
      </p>
    </section>
  )
}
