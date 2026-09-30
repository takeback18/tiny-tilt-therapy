import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { STORE_WORKER_URL } from '../storeConfig'

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

export default function Store() {
  const [searchParams] = useSearchParams()
  const purchased = searchParams.get('purchase') === 'success'

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(() => Boolean(STORE_WORKER_URL))
  const [errorMsg, setErrorMsg] = useState(() => (STORE_WORKER_URL ? '' : 'Store is not configured yet.'))
  const [buyingId, setBuyingId] = useState<string | null>(null)

  useEffect(() => {
    if (!STORE_WORKER_URL) return

    async function load() {
      try {
        const res = await fetch(`${STORE_WORKER_URL}/products`)
        const data = (await res.json()) as { products: Product[] }
        setProducts(data.products ?? [])
      } catch {
        setErrorMsg('Could not load products right now. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Store
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Downloadable Guides</h1>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              PDF guides made by our therapists. After you buy, we email the files straight to you.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Already bought something?{' '}
              <Link to="/downloads" className="text-sage-600 font-medium hover:underline underline-offset-2">
                Resend my downloads
              </Link>
            </p>
          </div>

          {purchased && (
            <div className="bg-sage-50 rounded-2xl p-6 text-center max-w-xl mx-auto mb-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Thank you for your purchase!</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your files are on their way to the email you used at checkout. They should arrive within a few
                minutes. If you don't see them, check your spam folder or{' '}
                <Link to="/downloads" className="text-sage-600 font-medium hover:underline underline-offset-2">
                  have them resent
                </Link>
                .
              </p>
            </div>
          )}

          {errorMsg && <p className="text-center text-sm text-red-500 mb-8">{errorMsg}</p>}

          {loading ? (
            <p className="text-center text-gray-400">Loading…</p>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg mb-1">No guides available yet</p>
              <p className="text-sm">Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border-2 border-sage-100 shadow-sm overflow-hidden flex flex-col"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-contain bg-gray-50"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-sage-600">{formatPrice(product.price_cents)}</span>
                      <button
                        onClick={() => handleBuy(product)}
                        disabled={buyingId === product.id}
                        className="inline-flex items-center gap-2 bg-sage-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <FiShoppingBag size={16} />
                        {buyingId === product.id ? 'Redirecting…' : 'Buy'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
