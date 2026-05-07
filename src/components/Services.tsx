import { FiHome, FiBook, FiClipboard, FiHeart } from 'react-icons/fi'
import type { IconType } from 'react-icons'

interface Service {
  icon: IconType
  title: string
  description: string
  accent: 'sage' | 'sky'
}

const services: Service[] = [
  {
    icon: FiHome,
    title: 'In-Home Assessment',
    description:
      'We come to you. Our therapists evaluate your child in the comfort of your own home, observing their natural movement patterns and identifying areas of concern without the stress of a clinical setting.',
    accent: 'sage',
  },
  {
    icon: FiBook,
    title: 'Parent Education & Guidance',
    description:
      "Knowledge is the first step. We walk parents through what torticollis is, why it happens, and — most importantly — what you can do every day to support your child's progress.",
    accent: 'sky',
  },
  {
    icon: FiClipboard,
    title: 'Personalized Treatment Plans',
    description:
      "No two children are the same. We build individualized care plans based on your child's specific presentation, your family's schedule, and goals that are realistic and achievable.",
    accent: 'sage',
  },
  {
    icon: FiHeart,
    title: 'Ongoing Support & Follow-Up',
    description:
      "Our relationship doesn't end after the first visit. We check in, track progress, adjust plans as your child grows, and stay available to answer questions along the way.",
    accent: 'sky',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">How We Help</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From assessment to ongoing care, our therapists guide your family through every
            step of the torticollis journey — at home, on your schedule.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            const isSage = service.accent === 'sage'
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSage ? 'bg-sage-100' : 'bg-sky-100'
                  }`}
                >
                  <Icon
                    size={22}
                    className={isSage ? 'text-sage-500' : 'text-sky-400'}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
