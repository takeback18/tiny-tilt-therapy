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
          <div className="bg-sky-50 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Form Coming Soon</h3>
            <p className="text-gray-500 leading-relaxed">
              We're setting up our contact system. In the meantime, reach out to us directly via email or social media and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact form — temporarily disabled while email server is configured
      <div className="max-w-2xl mx-auto">
        <form className="bg-sky-50 rounded-2xl p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition" placeholder="Jane" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition" placeholder="Smith" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 transition resize-none" placeholder="Tell us about your child and how we can help..." />
          </div>
          <button type="submit" className="w-full bg-sage-500 text-white py-3 rounded-full font-medium hover:bg-sage-600 transition-colors">
            Send Message
          </button>
        </form>
      </div>
      */}

    </section>
  )
}
