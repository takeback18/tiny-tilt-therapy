import { FiHome, FiBook, FiClipboard, FiHeart } from 'react-icons/fi'
import type { IconType } from 'react-icons'

interface Service {
  icon: IconType
  title: string
  description: string
  accent: 'sage' | 'sky'
  image: string
  imageAlt: string
}

const services: Service[] = [
  {
    icon: FiHome,
    title: 'In-Home Assessment',
    description:
      'We come to you. Our therapists evaluate your child in the comfort of your own home, observing their natural movement patterns and identifying areas of concern without the stress of a clinical setting.',
    accent: 'sage',
    image: '/baby3.JPG',
    imageAlt: 'Baby during in-home therapy assessment',
  },
  {
    icon: FiBook,
    title: 'Parent Education & Guidance',
    description:
      "Knowledge is the first step. We walk parents through what torticollis is, why it happens, and — most importantly — what you can do every day to support your child's progress.",
    accent: 'sky',
    image: '/baby4.JPG',
    imageAlt: 'Parent learning about baby development',
  },
  {
    icon: FiClipboard,
    title: 'Personalized Treatment Plans',
    description:
      "No two children are the same. We build individualized care plans based on your child's specific presentation, your family's schedule, and goals that are realistic and achievable.",
    accent: 'sage',
    image: '/baby5.JPG',
    imageAlt: 'Personalized baby care planning',
  },
  {
    icon: FiHeart,
    title: 'Ongoing Support & Follow-Up',
    description:
      "Our relationship doesn't end after the first visit. We check in, track progress, adjust plans as your child grows, and stay available to answer questions along the way.",
    accent: 'sky',
    image: '/baby6.JPG',
    imageAlt: 'Ongoing family support and follow-up',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-sky-50 overflow-hidden">

      {/* Section header */}
      <div className="pt-20 pb-12 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">How We Help</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From assessment to ongoing care, our therapists guide your family through every
            step of the torticollis journey — at home, on your schedule.
          </p>
        </div>
      </div>

      {/* Service rows */}
      {services.map((service, i) => {
        const Icon = service.icon
        const isSage = service.accent === 'sage'
        const imageRight = i % 2 === 0

        return (
          <div
            key={i}
            className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${
              i < services.length - 1 ? 'mb-10 lg:mb-0' : 'mb-0'
            }`}
          >
            <div className="flex flex-col lg:flex-row items-stretch">

              {/* Image — always first in DOM so it appears on top on mobile */}
              <div
                className={`relative flex-1 overflow-hidden rounded-2xl h-72 sm:h-80 lg:h-auto lg:min-h-[22rem] ${
                  imageRight
                    ? 'lg:order-2 lg:rounded-l-none lg:rounded-r-3xl'
                    : 'lg:order-1 lg:rounded-r-none lg:rounded-l-3xl'
                }`}
              >
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Gradient blends image edge into section background */}
                {imageRight ? (
                  <div className="hidden lg:block absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-sky-50 to-transparent pointer-events-none" />
                ) : (
                  <div className="hidden lg:block absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-sky-50 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Text content */}
              <div
                className={`flex-1 flex items-center py-10 lg:py-16 ${
                  imageRight
                    ? 'lg:order-1 lg:pr-14'
                    : 'lg:order-2 lg:pl-14'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      isSage ? 'bg-sage-100' : 'bg-sky-100'
                    }`}
                  >
                    <Icon size={22} className={isSage ? 'text-sage-500' : 'text-sky-400'} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                </div>
              </div>

            </div>
          </div>
        )
      })}

      <div className="pb-16" />

    </section>
  )
}
