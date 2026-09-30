import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { STORE_WORKER_URL, TURNSTILE_SITE_KEY } from '../storeConfig'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Downloads() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      if (!STORE_WORKER_URL) throw new Error('Store service is not configured. Please try again later.')
      if (!turnstileToken) throw new Error('Please complete the CAPTCHA.')

      const res = await fetch(`${STORE_WORKER_URL}/resend-downloads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken }),
      })

      const data = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      turnstileRef.current?.reset()
      setTurnstileToken('')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Downloads
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Resend My Downloads</h1>
            <p className="text-gray-600">
              Enter the email you used at checkout and we'll send your files again.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-sage-50 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-sage-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Check your email</h3>
              <p className="text-gray-500 leading-relaxed">
                If {email} has purchases, your downloads are on the way. Check your spam folder if you don't see them
                in a few minutes.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm text-sage-500 hover:text-sage-600 font-medium hover:underline underline-offset-2 transition-colors"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-sky-50 rounded-2xl p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
                  placeholder="jane@example.com"
                />
              </div>

              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken('')}
                onExpire={() => setTurnstileToken('')}
              />

              {status === 'error' && <p className="text-sm text-red-500">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === 'submitting' || !turnstileToken}
                className="w-full bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Email My Downloads'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
