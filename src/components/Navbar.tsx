import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaInstagram, FaTiktok } from 'react-icons/fa6'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" className="select-none flex-shrink-0">
            <img
              src="/logo-nav.png"
              alt="Tiny Tilt Therapy"
              className="h-40 w-auto -mb-2"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-sage-500 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Social icons */}
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
              <a
                href="https://www.instagram.com/tiny.tilt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-sage-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@tiny.tilt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 hover:text-sage-500 transition-colors"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-sage-500 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-sage-500 text-sm font-medium py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-4 pt-2 border-t border-gray-100 mt-2">
            <a
              href="https://www.instagram.com/tiny.tilt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-sage-500 transition-colors"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://www.tiktok.com/@tiny.tilt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-gray-400 hover:text-sage-500 transition-colors"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
