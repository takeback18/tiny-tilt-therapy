import { Link } from 'react-router-dom'
import { GIFT_GUIDE_ON, giftGuides } from '../giftGuides'

// A few guides spread across the age range, shown as a preview.
const PREVIEW = ['Tummy Time Warriors', 'Crawling Cuties', 'Wobbly Walkers', 'Preschool Pioneers']

export default function GiftGuideCallout() {
  if (!GIFT_GUIDE_ON) return null
  const preview = giftGuides.filter((g) => PREVIEW.includes(g.name))

  return (
    <section id="gift-guide" className="py-14 bg-warm-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-warm-200 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
              New for the Holidays
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Holiday Gift Guide</h2>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              Therapist-picked toys and gear for every stage, from tummy time to preschool.
            </p>
            <Link
              to="/gift-guide"
              className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sage-600 transition-colors shadow-sm"
            >
              See the Gift Guides →
            </Link>
          </div>

          <Link to="/gift-guide" className="grid grid-cols-4 gap-3" aria-label="See the gift guides">
            {preview.map((g) => (
              <img
                key={g.name}
                src={g.image}
                alt=""
                loading="lazy"
                className="w-full aspect-[3/4] object-contain bg-white rounded-xl border-2 border-warm-200 shadow-sm"
              />
            ))}
          </Link>
        </div>
      </div>
    </section>
  )
}
