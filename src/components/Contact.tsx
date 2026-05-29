import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const WORKER_URL: string = import.meta.env.VITE_CONTACT_WORKER_URL ?? ''

export default function Contact() {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [message,   setMessage]   = useState('')
  const [status,    setStatus]    = useState<Status>('idle')
  const [errorMsg,  setErrorMsg]  = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      if (!WORKER_URL) throw new Error('Contact service is not configured. Please try again later.')

      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, message }),
      })

      const data = await res.json() as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Something went wrong')
      }

      setStatus('success')
      setFirstName('')
      setLastName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            Have questions about torticollis or want to schedule an in-home consultation?
            We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {status === 'success' ? (
            <div className="bg-sage-50 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-sage-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-500 leading-relaxed">
                Thanks for reaching out. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm text-sage-500 hover:text-sage-600 font-medium hover:underline underline-offset-2 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-sky-50 rounded-2xl p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
                    placeholder="Smith"
                  />
                </div>
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition resize-none"
                  placeholder="Tell us about your child and how we can help..."
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-500">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
