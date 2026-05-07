import { FiExternalLink } from 'react-icons/fi'

type Category = 'Books' | 'Equipment' | 'Tools'

interface AffiliateLink {
  category: Category
  title: string
  description: string
  href: string
}

const affiliates: AffiliateLink[] = [
  {
    category: 'Books',
    title: '[Book Title]',
    description: 'A parent-friendly guide to understanding and supporting a child with torticollis.',
    href: '#',
  },
  {
    category: 'Books',
    title: '[Book Title]',
    description: 'Recommended reading on infant development and neck muscle care from our therapists.',
    href: '#',
  },
  {
    category: 'Equipment',
    title: '[Product Name]',
    description: 'Supportive positioning equipment to encourage midline head orientation during daily activities.',
    href: '#',
  },
  {
    category: 'Equipment',
    title: '[Product Name]',
    description: 'Therapy-approved tummy time support to build neck and shoulder strength.',
    href: '#',
  },
  {
    category: 'Tools',
    title: '[Product Name]',
    description: 'Visual engagement tools that motivate babies to turn toward their weaker side.',
    href: '#',
  },
  {
    category: 'Tools',
    title: '[Product Name]',
    description: 'At-home stretch and exercise accessories recommended for parent-led daily routines.',
    href: '#',
  },
]

const categoryStyle: Record<Category, string> = {
  Books: 'bg-sage-100 text-sage-600',
  Equipment: 'bg-sky-100 text-sky-500',
  Tools: 'bg-amber-50 text-amber-600',
}

export default function Affiliates() {
  return (
    <section id="affiliates" className="py-20 bg-sage-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Resources
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Recommended Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Products and books we personally use and recommend for families on the torticollis
            journey.{' '}
            <span className="text-gray-400 text-sm">
              Some links are Amazon affiliate links — at no extra cost to you.
            </span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliates.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    categoryStyle[item.category]
                  }`}
                >
                  {item.category}
                </span>
                <FiExternalLink
                  size={16}
                  className="text-gray-300 group-hover:text-sage-500 transition-colors flex-shrink-0 mt-0.5"
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
