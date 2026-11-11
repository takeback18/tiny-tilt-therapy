import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiCopy, FiImage } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { findGuide } from '../giftGuides'
import type { GiftItem } from '../giftGuides'
import { BOOKING_URL } from '../siteLinks'

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the code is still visible to type in by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 font-mono font-bold tracking-wide text-sage-700 bg-white border-2 border-dashed border-sage-300 rounded-lg px-3 py-1 hover:border-sage-500 transition-colors"
      aria-label={`Copy code ${code}`}
    >
      {code}
      {copied ? <FiCheck size={14} className="text-sage-500" /> : <FiCopy size={14} />}
    </button>
  )
}

function ItemCard({ item }: { item: GiftItem }) {
  const buttonLabel = item.store === 'Amazon' ? 'Shop on Amazon' : `Shop at ${item.store}`

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${
        item.code ? 'border-sage-300' : 'border-warm-200'
      }`}
    >
      <a
        href={item.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="block"
      >
        {item.image ? (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="w-full aspect-square object-contain bg-white"
          />
        ) : (
          <div className="w-full aspect-square bg-warm-100 flex items-center justify-center">
            <FiImage size={40} className="text-warm-300" />
          </div>
        )}
      </a>

      <div className="flex flex-col flex-1 px-4 pb-4 pt-2">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>

        {item.code && (
          <div className="mt-3 bg-sage-50 rounded-xl px-3 py-2.5 text-sm text-gray-700">
            Use code <CopyCode code={item.code} /> {item.codeText}
          </div>
        )}

        <a
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-auto pt-4"
        >
          <span className="block text-center bg-sage-500 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-sage-600 transition-colors">
            {buttonLabel} →
          </span>
        </a>
      </div>
    </div>
  )
}

export default function GiftGuideDetail() {
  const { slug } = useParams()
  const guide = findGuide(slug)

  // Unknown guide, or one that still lives only on Amazon: back to the overview.
  if (!guide?.items) return <Navigate to="/gift-guide" replace />

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/gift-guide"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-600 hover:underline underline-offset-2 mb-8"
          >
            <FiArrowLeft size={16} /> All gift guides
          </Link>

          {/* Guide header */}
          <div className="grid md:grid-cols-[minmax(0,20rem)_1fr] gap-8 items-center mb-12">
            <img
              src={guide.image}
              alt={`${guide.name} gift guide`}
              className="w-full max-w-xs mx-auto md:max-w-none rounded-2xl border-2 border-warm-200 shadow-sm bg-white"
            />
            <div className="text-center md:text-left">
              <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
                Holiday Gift Guide
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{guide.name}</h1>
              {guide.description && (
                <p className="text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                  {guide.description}
                </p>
              )}
              {guide.stage && (
                <p className="text-sage-700 mt-3">
                  <span className="font-semibold">Developmental stage:</span> {guide.stage}
                </p>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-sm sm:max-w-none mx-auto">
            {guide.items.map((item) => (
              <ItemCard key={item.href} item={item} />
            ))}
          </div>

          {/* Booking nudge */}
          <div className="mt-16 bg-sky-50 rounded-3xl px-6 py-10 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Not sure what stage your baby is in?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
              If you have questions about how your little one is moving or developing, we're
              happy to help.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sage-600 transition-colors shadow-sm"
            >
              Book a Consultation →
            </a>
          </div>

          <p className="text-gray-400 text-sm text-center mt-10 max-w-2xl mx-auto">
            We may earn a commission from links on this page, at no extra cost to you. As an
            Amazon Associate, Tiny Tilt Therapy earns from qualifying purchases.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
