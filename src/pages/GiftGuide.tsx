import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { giftGuides } from '../giftGuides'
import GiftGuideShop from '../components/GiftGuideShop'
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
              The Tiny Tilt Gift Guides are here!
            </h1>
            <div className="text-gray-600 max-w-2xl mx-auto leading-relaxed space-y-3">
              <p>
                As pediatric physical therapists, we’ve put together gift guides organized around
                developmental milestones rather than age. Whether your little one is working on
                tummy time, rolling, sitting, crawling, cruising, walking, or mastering those
                toddler and preschool skills, we’ve rounded up some of our favorite toys and
                products to support each stage.
              </p>
              <p>
                Every child develops at their own pace, so find the stage that best fits your
                little one and click on it to explore our favorite picks for learning through play.
              </p>
            </div>
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
                    <p className="px-4 pt-1 text-sm text-gray-600 leading-relaxed">
                      {guide.description}
                    </p>
                  )}
                  {guide.stage && (
                    <p className="px-4 pt-3 mt-auto text-sm text-sage-700">
                      <span className="font-semibold">Developmental stage:</span> {guide.stage}
                    </p>
                  )}
                  {/* Looks like a button; the whole card is the link. */}
                  <span className="mx-4 mt-4 mb-4 block text-center bg-sage-500 text-white px-4 py-2.5 rounded-full text-sm font-semibold group-hover:bg-sage-600 transition-colors">
                    Click Here to Shop →
                  </span>
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

          <GiftGuideShop />

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
