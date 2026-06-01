const torticollisSigns = [
  'Head consistently tilted to one side',
  'Difficulty turning head fully in one direction',
  'Preference to feed on one side',
  'Stiffness or tightness in the neck muscles',
  'Chin rotated toward the opposite shoulder',
]

const plagiocephalySigns = [
  'Flat spot on one side or back of the head',
  'Asymmetrical ears — one appearing further forward',
  'Forehead or cheek appearing more prominent on one side',
  'Head looks wider or more slanted from above',
  'Facial asymmetry that becomes more noticeable over time',
]

function CheckIcon({ color }: { color: 'sage' | 'sky' }) {
  return (
    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${color === 'sage' ? 'bg-sage-500' : 'bg-sky-400'}`}>
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export default function WhatIsTorticollis() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What Are We Treating?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Torticollis and plagiocephaly often go hand in hand. Understanding both conditions
            helps families recognize the signs early and get support sooner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Torticollis */}
          <div className="bg-sage-50 rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">What is Torticollis?</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Torticollis, also called "wry neck," occurs when the muscles on one side of
              the neck tighten or shorten, causing a baby's head to tilt and rotate. It's
              more common than many parents realize, and with early support, most children
              make a full recovery.
            </p>
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Signs to Watch For</h4>
            <ul className="space-y-3 mb-8">
              {torticollisSigns.map((sign, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <CheckIcon color="sage" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-auto inline-block self-start bg-sage-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-sage-600 transition-colors text-sm"
            >
              Schedule a Consultation
            </a>
          </div>

          {/* Plagiocephaly */}
          <div className="bg-sky-50 rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">What is Plagiocephaly?</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Plagiocephaly, commonly known as "flat head syndrome," is a condition where
              a baby's skull develops a flat spot, typically due to prolonged pressure on one
              area. It frequently occurs alongside torticollis, as the head tilt causes babies
              to consistently rest on the same side.
            </p>
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Signs to Watch For</h4>
            <ul className="space-y-3 mb-8">
              {plagiocephalySigns.map((sign, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <CheckIcon color="sky" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
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
