import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { STORE_WORKER_URL, useAuth } from '../context/useAuth'

interface PurchaseFile {
  id: string
  label: string
}

interface Purchase {
  product_id: string
  name: string
  description: string
  price_cents: number
  image_url: string | null
  created_at: string
  files: PurchaseFile[]
}

export default function Account() {
  const { user, loading: authLoading, logout } = useAuth()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!STORE_WORKER_URL || !user) return
    fetch(`${STORE_WORKER_URL}/account/purchases`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { purchases: [] }))
      .then((data: { purchases: Purchase[] }) => setPurchases(data.purchases ?? []))
      .finally(() => setLoading(false))
  }, [user])

  if (!authLoading && !user) {
    return <Navigate to="/login?next=/account" replace />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
                Account
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">My Downloads</h1>
              {user && <p className="text-gray-500 text-sm">{user.email}</p>}
            </div>
            <button
              onClick={() => logout()}
              className="text-sm text-gray-500 hover:text-sage-600 hover:underline underline-offset-2"
            >
              Log out
            </button>
          </div>

          {authLoading || loading ? (
            <p className="text-gray-400">Loading…</p>
          ) : purchases.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg mb-1">No purchases yet</p>
              <p className="text-sm">Browse the store to find a guide.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {purchases.map((p) => (
                <div
                  key={p.product_id}
                  className="bg-white rounded-2xl border-2 border-sage-100 shadow-sm p-6 flex flex-col gap-4"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1">{p.name}</h3>
                    <p className="text-gray-500 text-sm">Purchased {new Date(p.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.files.map((f) => (
                      <a
                        key={f.id}
                        href={`${STORE_WORKER_URL}/download/${p.product_id}/${f.id}`}
                        className="inline-flex items-center gap-2 bg-sage-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors"
                      >
                        <FiDownload size={16} /> {f.label}
                      </a>
                    ))}
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
