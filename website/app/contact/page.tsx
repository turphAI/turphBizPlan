import Link from 'next/link';

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
            Turph AI
          </Link>
          <nav>
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Back to home
            </Link>
          </nav>
        </div>
      </header>

      {/* Contact Section */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's talk</h1>
        <p className="text-lg text-gray-600 mb-12">
          If you're curious about discovering what's possible in your workflow, get in touch.
        </p>

        <div className="space-y-8">
          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <a 
              href="mailto:turphs.ai@gmail.com"
              className="text-blue-600 hover:text-blue-700 font-medium text-lg"
            >
              turphs.ai@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <a 
              href="tel:+16174290698"
              className="text-blue-600 hover:text-blue-700 font-medium text-lg"
            >
              617-429-0698
            </a>
          </div>

          {/* LinkedIn */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">LinkedIn</h3>
            <a 
              href="https://www.linkedin.com/in/tom-murphy-453479/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-lg"
            >
              Connect on LinkedIn
            </a>
          </div>

          {/* Contact Form */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Send a message</h3>
            
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell me about your workflow challenges..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Send message
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
              Note: The form is connected to Formspree. You'll need to set up a Formspree account and replace "YOUR_FORM_ID" with your actual form ID.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2026 Turph AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
