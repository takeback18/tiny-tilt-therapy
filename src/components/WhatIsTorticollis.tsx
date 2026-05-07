const signs = [
  'Head consistently tilted to one side',
  'Difficulty turning head fully in one direction',
  'Flat spot on one side of the head (plagiocephaly)',
  'Preference to feed on one side',
  'Stiffness or tightness in the neck muscles',
  'Chin rotated toward the opposite shoulder',
]

export default function WhatIsTorticollis() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What is Torticollis?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Torticollis — also called "wry neck" — occurs when the muscles on one side of
            the neck tighten or shorten, causing a baby's head to tilt and rotate. It's
            more common than many parents realize, and with early support, most children
            make a full recovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-sage-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Signs to Watch For</h3>
            <ul className="space-y-3">
              {signs.map((sign, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="flex-shrink-0 w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sky-50 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">When to Seek Help</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you notice your baby consistently preferring one side, struggling to turn
              their head, or developing a flat spot, it's worth reaching out to a specialist.
              The earlier torticollis is identified, the easier it is to treat.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our therapists can evaluate your child at home, walk you through what they
              observe, and create a plan that fits your family's routine. You don't have to
              figure this out alone.
            </p>
            <a
              href="#contact"
              className="mt-auto inline-block self-start bg-sky-400 text-white px-5 py-2.5 rounded-full font-medium hover:bg-sky-500 transition-colors text-sm"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
