interface Therapist {
  initials: string
  name: string
  title: string
  bio: string
  avatarColor: string
}

const therapists: Therapist[] = [
  {
    initials: '??',
    name: '[Therapist Name]',
    title: 'Pediatric Physical Therapist',
    bio: 'Placeholder bio — share your background, certifications, and what drew you to torticollis care. This is a great place to add a personal touch.',
    avatarColor: 'bg-sage-400',
  },
  {
    initials: '??',
    name: '[Therapist Name]',
    title: 'Pediatric Occupational Therapist',
    bio: 'Placeholder bio — share your background, certifications, and what drew you to torticollis care. This is a great place to add a personal touch.',
    avatarColor: 'bg-sky-400',
  },
  {
    initials: '??',
    name: '[Therapist Name]',
    title: 'Pediatric Physical Therapist',
    bio: 'Placeholder bio — share your background, certifications, and what drew you to torticollis care. This is a great place to add a personal touch.',
    avatarColor: 'bg-sage-300',
  },
  {
    initials: '??',
    name: '[Therapist Name]',
    title: 'Pediatric Occupational Therapist',
    bio: 'Placeholder bio — share your background, certifications, and what drew you to torticollis care. This is a great place to add a personal touch.',
    avatarColor: 'bg-sky-300',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sage-100 text-sage-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Meet the Therapists
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our team brings years of pediatric therapy experience and a shared passion for
            helping families navigate torticollis with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapists.map((t, i) => (
            <div key={i} className="text-center">
              {/* Replace this div with an <img> once headshots are available */}
              <div
                className={`w-28 h-28 rounded-full ${t.avatarColor} flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-white text-2xl font-bold">{t.initials}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
              <p className="text-sage-500 text-sm font-medium mb-3">{t.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
