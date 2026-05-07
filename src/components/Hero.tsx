export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-sage-50 via-white to-sky-50 pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-6">
            Torticollis Awareness &amp; Support
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Helping Your Little One Find Their{' '}
            <span className="text-sage-500">Balance</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Tiny Tilt Therapy is a group of dedicated pediatric therapists passionate about
            torticollis awareness and early intervention. We educate families and offer
            in-home consultations to support your child's journey toward comfortable,
            healthy movement.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              className="bg-sage-500 text-white px-6 py-3 rounded-full font-medium hover:bg-sage-600 transition-colors"
            >
              Learn About Torticollis
            </a>
            <a
              href="#team"
              className="border-2 border-sage-500 text-sage-600 px-6 py-3 rounded-full font-medium hover:bg-sage-50 transition-colors"
            >
              Meet Our Team
            </a>
          </div>
        </div>
      </div>

      {/* Decorative background circles */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-sky-100 rounded-full opacity-40 -translate-x-8 hidden lg:block pointer-events-none" />
      <div className="absolute bottom-1/3 right-28 w-44 h-44 bg-sage-100 rounded-full opacity-60 hidden lg:block pointer-events-none" />

      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="#ffffff">
          <path d="M0,32L80,37C160,43,320,53,480,53C640,53,800,43,960,37C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
        </svg>
      </div>
    </section>
  )
}
