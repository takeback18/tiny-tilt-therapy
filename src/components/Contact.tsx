import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa6'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-500 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            Have questions about torticollis or want to schedule an in-home consultation?
            We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="bg-sky-50 rounded-2xl p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition resize-none"
                placeholder="Tell us about your child and how we can help..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="text-center mt-10">
            <p className="text-gray-400 text-sm mb-5">Or find us on social media</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/tiny.tilt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 hover:bg-sage-200 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 hover:bg-sky-200 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 hover:bg-sage-200 transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
