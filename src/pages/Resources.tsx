import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiExternalLink } from 'react-icons/fi'
import { CATEGORIES, resources } from '../data/resources'
import type { Category } from '../data/resources'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categoryColors: Record<Category, { badge: string; card: string }> = {
  'Baby Care Items': {
    badge: 'bg-warm-200 text-sage-600',
    card:  'border-warm-200 hover:border-warm-300',
  },
  'Baby Containers': {
    badge: 'bg-sky-100 text-sky-600',
    card:  'border-sky-100 hover:border-sky-300',
  },
  'Baby Feeding': {
    badge: 'bg-sage-100 text-sage-700',
    card:  'border-sage-100 hover:border-sage-300',
  },
  'Baby Safety': {
    badge: 'bg-sky-50 text-sky-600',
    card:  'border-sky-100 hover:border-sky-200',
  },
  'Baby Toys': {
    badge: 'bg-sky-100 text-sky-500',
    card:  'border-sky-100 hover:border-sky-300',
  },
  'Nursing and Pumping': {
    badge: 'bg-sage-50 text-sage-600',
    card:  'border-sage-100 hover:border-sage-200',
  },
  'Toddler Toys': {
    badge: 'bg-warm-100 text-sage-600',
    card:  'border-warm-100 hover:border-warm-200',
  },
}

function getBadgeStyle(category: Category) {
  return categoryColors[category]?.badge ?? 'bg-gray-100 text-gray-600'
}
function getCardStyle(category: Category) {
  return categoryColors[category]?.card ?? 'border-gray-100 hover:border-gray-300'
}

function extractAsin(href: string): string {
  const match = href.match(/\/dp\/([A-Z0-9]{10})/)
  return match ? match[1] : ''
}

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category')
  const idParam = searchParams.get('id') ?? ''

  const activeCategory: Category | 'All' =
    categoryParam && (CATEGORIES as readonly string[]).includes(categoryParam)
      ? (categoryParam as Category)
      : 'All'

  function setSearch(q: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      q ? next.set('q', q) : next.delete('q')
      next.delete('id')
      return next
    }, { replace: true })
  }

  function setActiveCategory(cat: Category | 'All') {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      cat !== 'All' ? next.set('category', cat) : next.delete('category')
      next.delete('q')
      next.delete('id')
      return next
    }, { replace: true })
  }

  const filtered = useMemo(() => {
    if (idParam) {
      return resources.filter(r => extractAsin(r.href) === idParam)
    }
    const q = search.toLowerCase()
    return resources.filter((r) => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory, idParam])

  const isSharedView = Boolean(idParam && filtered.length > 0)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Resources
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Our Resource Library
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              Hand-picked by our therapists to support your family's torticollis journey.{' '}
              <span className="text-gray-400 text-sm">
                Some links may be affiliate links, at no extra cost to you.
              </span>
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-300 transition bg-white shadow-sm"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(['All', ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat && !idParam
                    ? 'bg-sage-500 text-white border-sage-500'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-sage-300 hover:text-sage-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Shared item notice */}
          {isSharedView && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <p className="text-sm text-gray-400">
                Showing a therapist recommendation. Use the search or categories above to browse the full library.
              </p>
            </div>
          )}

          {/* Results */}
          {filtered.length > 0 ? (
            <div className={`grid gap-6 ${isSharedView ? 'max-w-sm mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {filtered.map((item) => (
                <a
                  key={extractAsin(item.href) || item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white rounded-2xl border-2 shadow-sm transition-all group overflow-hidden ${getCardStyle(item.category)}`}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-contain bg-gray-50"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getBadgeStyle(item.category)}`}>
                        {item.category}
                      </span>
                      <FiExternalLink
                        size={16}
                        className="text-gray-300 group-hover:text-sage-500 transition-colors flex-shrink-0 mt-0.5"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg mb-1">No resources found</p>
              <p className="text-sm">Try a different search or category</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
