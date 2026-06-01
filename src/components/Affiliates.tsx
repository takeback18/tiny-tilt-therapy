export default function Affiliates() {
  return (
    <section id="affiliates" className="py-20 bg-sage-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Resources
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Our Resource Library
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed mb-8">
          We've hand-picked books, toys, and more to support families on the torticollis
          journey, all personally recommended by our therapists.
        </p>
        <a
          href="/resources"
          className="inline-block bg-sage-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sage-600 transition-colors shadow-sm"
        >
          Browse Resources →
        </a>
      </div>
    </section>
  )
}
