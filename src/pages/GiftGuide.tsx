import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { giftGuides } from '../giftGuides'
import { BOOKING_URL } from '../siteLinks'

export default function GiftGuide() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Holiday Gift Guide
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Gifts for Every Stage
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Shopping for a little one this season? Our pediatric physical therapists picked
              toys and gear for each stage of movement, from tummy time to preschool, so your
              gift supports the skills they're working on right now. Tap a guide to see the
              full list.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              We may earn a commission from links on this page, at no extra cost to you. As an
              Amazon Associate, Tiny Tilt Therapy earns from qualifying purchases.
            </p>
          </div>

          {/* Guides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-sm sm:max-w-none mx-auto">
            {giftGuides.map((guide) => {
              const cardClass =
                'group flex flex-col bg-white rounded-2xl border-2 border-warm-200 shadow-sm overflow-hidden transition-all hover:border-sage-200 hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200'
              const content = (
                <>
                  <img
                    src={guide.image}
                    alt={`${guide.name} gift guide`}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-contain bg-white"
                  />
                  {guide.description && (
                    <p className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
                      {guide.description}
                    </p>
                  )}
                </>
              )
              // Guides with their own item list open a page on our site; the rest go to Amazon.
              return guide.items ? (
                <Link key={guide.slug} to={`/gift-guide/${guide.slug}`} className={cardClass}>
                  {content}
                </Link>
              ) : (
                <a
                  key={guide.slug}
                  href={guide.href}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  aria-label={`${guide.name} gift guide (opens Amazon in a new tab)`}
                  className={cardClass}
                >
                  {content}
                </a>
              )
            })}
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
