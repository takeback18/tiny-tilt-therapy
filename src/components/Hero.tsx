export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-sky-50 pt-16 overflow-hidden lg:min-h-screen lg:flex lg:items-center"
    >
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 lg:pt-24 lg:pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-1 lg:gap-0 items-center">

          {/* Text */}
          <div className="order-2 lg:order-1 lg:pr-10">
            <img
              src="/tinytiltherologo.png"
              alt="Tiny Tilt In-Home Therapy"
              className="w-full max-w-xl h-auto -mb-12 -mt-10 lg:mt-0 mx-auto block"
            />
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 leading-tight mb-6 text-center">
              Supporting{' '}
              <span className="text-sage-500">Symmetry, Strength,</span>
              {' '}and Development
            </h1>
            <div className="text-base text-gray-600 leading-relaxed mb-8 space-y-4">
              <p>
                We're a team of moms and board-certified pediatric physical therapists in
                Northeast Florida, so we understand firsthand both the clinical expertise
                and the everyday realities of caring for little ones.
              </p>
              <p>
                We're passionate about helping babies with torticollis, head tilts, and
                flat head concerns move, grow, and thrive from the very beginning.
              </p>
              <p>
                We believe in early intervention, empowering parent education, and truly
                individualized care. Every baby's journey is unique.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="bg-sage-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-sage-600 transition-colors shadow-sm"
              >
                Learn About Our Services
              </a>
              <a
                href="#team"
                className="border-2 border-sage-500 text-sage-600 px-6 py-3 rounded-full font-semibold hover:bg-sage-50 transition-colors"
              >
                Meet Our Team
              </a>
            </div>
          </div>

          {/* Image with left fade into background */}
          <div className="order-1 lg:order-2 -mx-4 sm:mx-0 flex items-center justify-center">
            <div className="relative w-full sm:w-80 lg:w-full">
              <img
                src="/baby2.jpg"
                alt="Happy baby"
                className="w-full h-80 sm:h-80 lg:h-[34rem] object-cover [object-position:center_30%] lg:object-center sm:rounded-3xl lg:rounded-l-none lg:rounded-r-3xl"
              />
              {/* Fade from white background into image — desktop only */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-sky-50 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
