export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-sage-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img src="/logo.jpg" alt="Tiny Tilt Therapy" className="h-14 w-auto rounded-lg" />
            </div>
            <p className="text-sage-100 text-sm leading-relaxed">
              Dedicated to torticollis awareness and compassionate support for families
              everywhere.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sage-100 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-sage-200">
              {[
                ['About Torticollis', '#about'],
                ['Services', '#services'],
                ['Our Team', '#team'],
                ['Resources', '#affiliates'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-sage-100 mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-sage-200">
              {[
                ['Instagram', 'https://www.instagram.com/tiny.tilt'],
                ['Facebook', '#'],
                ['TikTok', '#'],
                ['Contact Us', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-600 pt-6 text-center text-sage-300 text-sm space-y-1">
          <p>© {year} Tiny Tilt Therapy. All rights reserved.</p>
          <p>Some resource links may be affiliate links. We only recommend what we trust.</p>
        </div>
      </div>
    </footer>
  )
}
