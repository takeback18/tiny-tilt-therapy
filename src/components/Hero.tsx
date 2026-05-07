export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-sage-50 via-white to-sky-50 pt-16 overflow-hidden"
    >
      {/* Scattered dots — echoing the ·tiny·tilt· dot motif */}
      <div className="absolute top-24 left-6 w-3 h-3 rounded-full bg-sage-300 opacity-60" />
      <div className="absolute top-44 left-16 w-2 h-2 rounded-full bg-sky-300 opacity-70" />
      <div className="absolute top-1/3 left-10 w-4 h-4 rounded-full bg-sage-200 opacity-50" />
      <div className="absolute bottom-40 left-8 w-2.5 h-2.5 rounded-full bg-sky-200 opacity-60" />
      <div className="absolute top-20 right-6 w-2 h-2 rounded-full bg-sage-300 opacity-50 hidden lg:block" />
      <div className="absolute bottom-1/3 right-10 w-3.5 h-3.5 rounded-full bg-sky-200 opacity-60 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6 -rotate-1 shadow-sm">
              · Torticollis Awareness &amp; Support ·
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Helping Your Little One{' '}
              <span className="text-sage-500">Find Their Balance</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Tiny Tilt Therapy is a group of dedicated pediatric therapists passionate
              about torticollis awareness and early intervention. We educate families and
              offer in-home consultations to support your child's journey toward
              comfortable, healthy movement.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="bg-sage-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-sage-600 transition-colors shadow-sm"
              >
                Learn About Torticollis
              </a>
              <a
                href="#team"
                className="border-2 border-sage-500 text-sage-600 px-6 py-3 rounded-full font-semibold hover:bg-sage-50 transition-colors"
              >
                Meet Our Team
              </a>
            </div>
          </div>

          {/* Logo — floats gently */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Soft glow behind the logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200 to-sky-200 rounded-full blur-3xl opacity-40 scale-75" />
              <img
                src="/logo.png"
                alt="Tiny Tilt Therapy"
                className="relative w-64 sm:w-80 lg:w-96 animate-float drop-shadow-md"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Wave into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="#ffffff">
          <path d="M0,32L80,37C160,43,320,53,480,53C640,53,800,43,960,37C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
        </svg>
      </div>
    </section>
  )
}
