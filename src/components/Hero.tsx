function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 0 13.2 7.8 16 11C18.8 14.2 24 12 24 12C24 12 18.8 9.8 16 13C13.2 16.2 12 24 12 24C12 24 10.8 16.2 8 13C5.2 9.8 0 12 0 12C0 12 5.2 14.2 8 11C10.8 7.8 12 0 12 0Z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-white pt-16 overflow-hidden"
    >
      {/* Background blobs — soft, colorful, layered */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-sage-200 rounded-full blur-3xl opacity-35" />
      <div className="absolute top-1/4 -right-16 w-80 h-80 bg-sky-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-16 left-1/3 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-40" />
      <div
        className="absolute top-8 right-1/4 w-56 h-56 blur-3xl opacity-25"
        style={{ background: '#fde68a', borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}
      />
      <div
        className="absolute bottom-24 -left-8 w-48 h-48 blur-2xl opacity-20"
        style={{ background: '#a9d4c5', borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%' }}
      />

      {/* Sparkle stars */}
      <Sparkle className="absolute top-24 left-1/4 w-5 h-5 text-sage-400 opacity-75" />
      <Sparkle className="absolute top-36 right-20 w-7 h-7 text-warm-300 opacity-70 hidden lg:block" />
      <Sparkle className="absolute top-1/2 right-1/3 w-4 h-4 text-sky-400 opacity-60 hidden lg:block" />
      <Sparkle className="absolute bottom-36 left-16 w-4 h-4 text-warm-200 opacity-80" />
      <Sparkle className="absolute bottom-1/3 right-12 w-5 h-5 text-sage-300 opacity-65 hidden lg:block" />
      <Sparkle className="absolute top-20 left-12 w-3 h-3 text-sky-300 opacity-55" />

      {/* Dot motif */}
      <div className="absolute top-1/3 left-8 w-2.5 h-2.5 rounded-full bg-sage-300 opacity-60" />
      <div className="absolute bottom-1/2 left-24 w-2 h-2 rounded-full bg-warm-300 opacity-50" />
      <div className="absolute top-48 right-8 w-3 h-3 rounded-full bg-sky-300 opacity-50 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div className="order-2 lg:order-1">
            <span className="inline-block bg-sage-100 text-sage-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 -rotate-1 shadow-sm">
              ✦ Torticollis Awareness &amp; Support ✦
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Helping Your{' '}
              <span className="inline-block bg-warm-200 px-2 py-0.5 rounded-lg -rotate-1">
                Little One
              </span>{' '}
              <span
                className="text-sage-500 whitespace-nowrap"
                style={{
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'wavy',
                  textDecorationColor: '#7fbfad',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '6px',
                }}
              >
                Find Their Balance
              </span>
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

          {/* Logo */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <img
              src="/logo.png"
              alt="Tiny Tilt Therapy"
              className="w-64 sm:w-80 lg:w-[26rem] drop-shadow-lg"
            />
          </div>

        </div>
      </div>

      {/* Playful wavy bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 110" fill="#ffffff">
          <path d="M0,60 C120,100 240,20 360,60 C480,100 600,15 720,55 C840,95 960,20 1080,60 C1200,100 1320,30 1440,60 L1440,110 L0,110 Z" />
        </svg>
      </div>
    </section>
  )
}
