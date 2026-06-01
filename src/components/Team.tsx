import { useState, useEffect } from 'react'

interface Therapist {
  name: string
  title: string
  bio: string
  image: string
  objectPosition: string
}

const therapists: Therapist[] = [
  {
    name: 'Melanie Hill, PT, DPT, PCS',
    title: 'Pediatric Physical Therapist',
    image: '/Melanie.PNG',
    objectPosition: 'center 15%',
    bio: 'Melanie Hill is a Board-Certified Clinical Specialist in Pediatric Physical Therapy by the American Board of Physical Therapy Specialties (ABPTS). She graduated from Ithaca College Doctor of Physical Therapy (DPT) program in 2013 and completed her pediatric physical therapy residency with Brooks Rehabilitation in 2015. She has PT clinical experience in acute care, school system and outpatient settings.',
  },
  {
    name: 'Jessie Kristof, PT, DPT, PCS',
    title: 'Pediatric Physical Therapist',
    image: '/Jessie.png',
    objectPosition: 'center 27%',
    bio: 'Jessie Kristof is a Board-Certified Clinical Specialist in Pediatric Physical Therapy by the American Board of Physical Therapy Specialties (ABPTS). She graduated from the University of North Florida Doctor of Physical Therapy (DPT) program in 2016 and completed her pediatric physical therapy residency with Brooks Rehabilitation in 2018. She has PT clinical experience in NICU, acute care, school system, early intervention / in-home and outpatient settings.',
  },
  {
    name: 'Shelbi Moxley, PT, DPT, PCS',
    title: 'Pediatric Physical Therapist',
    image: '/Shelbi.PNG',
    objectPosition: 'center 20%',
    bio: 'Shelbi Moxley is a Board-Certified Clinical Specialist in Pediatric Physical Therapy by the American Board of Physical Therapy Specialties (ABPTS). She graduated from University of St. Augustine Doctor of Physical Therapy (DPT) program in 2019 and completed her pediatric physical therapy residency with Brooks Rehabilitation in 2022. She has PT clinical experience in NICU discharge / follow-up care, acute care, early intervention / in-home and outpatient settings.',
  },
  {
    name: 'Caroline Scott, PT, DPT, PCS',
    title: 'Pediatric Physical Therapist',
    image: '/Caroline.JPEG',
    objectPosition: 'center 25%',
    bio: 'Caroline Scott is a Board-Certified Clinical Specialist in Pediatric Physical Therapy by the American Board of Physical Therapy Specialties (ABPTS). She graduated from Duke University Doctor of Physical Therapy (DPT) program in 2017 and completed her pediatric physical therapy residency with Brooks Rehabilitation in 2018. She has PT clinical experience in NICU, acute care, inpatient rehabilitation, early intervention / in-home and outpatient settings.',
  },
]

export default function Team() {
  const [selected, setSelected] = useState<Therapist | null>(null)

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {therapists.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-center text-center cursor-pointer group"
              onClick={() => setSelected(t)}
            >
              <div className="w-36 h-36 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: t.objectPosition }}
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 whitespace-nowrap">{t.name}</h3>
              <p className="text-sage-500 text-sm font-medium mb-3">{t.title}</p>
              <button
                className="text-sm text-sage-500 font-medium hover:text-sage-600 transition-colors hover:underline underline-offset-2"
                onClick={(e) => { e.stopPropagation(); setSelected(t) }}
              >
                Read Bio →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-8 pt-10">
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-sm"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Pull handle on mobile */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full sm:hidden" />

              {/* Therapist info */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-4">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: selected.objectPosition }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{selected.name}</h3>
                <p className="text-sage-500 text-sm font-medium mt-1">{selected.title}</p>
              </div>

              {/* Bio */}
              <p className="text-gray-600 leading-relaxed text-sm">{selected.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
