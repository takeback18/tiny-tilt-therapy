import { BOOKING_URL } from '../siteLinks'

export default function BookConsultation() {
  return (
    <section id="book" className="py-20 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Book Online
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Schedule a Consultation
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed mb-8">
          Ready to get started? Book an in-home visit online. Pick your area, choose the
          therapist who serves it, and find a time that works for your family.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sage-600 transition-colors shadow-sm"
        >
          Book a Consultation →
        </a>
        <p className="text-sm text-gray-500 mt-4">
          Opens our booking page in a new tab. Questions first?{' '}
          <a href="#contact" className="text-sage-600 font-medium hover:underline underline-offset-2">
            Send us a message
          </a>
          .
        </p>
      </div>
    </section>
  )
}
