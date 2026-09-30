import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { BOOKING_URL } from '../siteLinks'
import { isStoreUnlocked, tryUnlockStore } from '../storeConfig'

// Shows a "coming soon" screen in front of the store pages until STORE_OPEN is
// true or this browser has been unlocked with the preview password.
export default function StoreGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(isStoreUnlocked)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  if (unlocked) return <>{children}</>

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setChecking(true)
    setError('')
    const ok = await tryUnlockStore(password)
    setChecking(false)
    if (ok) setUnlocked(true)
    else setError("That password isn't right.")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Store
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
          <p className="text-gray-600 leading-relaxed mb-10">
            We're putting the finishing touches on downloadable guides made by our therapists.
            Check back soon. In the meantime, you can{' '}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-600 font-medium hover:underline underline-offset-2"
            >
              book a consultation
            </a>
            .
          </p>

          <form onSubmit={handleSubmit} className="bg-sky-50 rounded-2xl p-6 text-left space-y-3">
            <label className="block text-sm font-medium text-gray-500">Preview access</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
              placeholder="Password"
              autoComplete="off"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={checking || !password}
              className="w-full bg-sage-500 text-white py-2.5 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checking ? 'Checking…' : 'Enter'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
