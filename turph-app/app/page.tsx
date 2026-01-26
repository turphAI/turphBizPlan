import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Turph AI</h1>
          <nav>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Get in touch
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Discover and validate workflow improvements faster
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            I help companies move faster by embedding directly with your teams for 4-5 weeks to discover and validate workflow improvements grounded in real user data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Problem Statement */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Most companies know they have workflow problems</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The challenge isn't identifying problems, it's discovering solutions that actually work. You could hire consultants who design solutions from conference rooms. You could implement off-the-shelf software that doesn't quite fit. Or you could try building it all internally, which takes time you don't have.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            There's a better way.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Rather than designing solutions in a vacuum, I work on-site, understand your actual constraints and opportunities, rapidly prototype multiple possibilities using AI tools to accelerate iteration, and test them with real users before you commit significant resources.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Unlike traditional consulting, which relies on assumptions, or AI vendors, which push technology first, I focus on one thing: discovering what actually works for your teams.
          </p>
        </div>

        {/* The Approach */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">The embedded approach</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            My process starts with understanding. Week one and two, I embed with your teams. I observe actual workflows, conduct user interviews, and map the real pain points—not what people think happens, but what actually happens. From there, weeks two through four, I prototype multiple solutions using AI to accelerate iteration—not as the end goal, but as a tool to move quickly. Then weeks four and five, I validate these prototypes with your users to measure what creates real value and what doesn't. By the end of week five, you have working prototypes, tested hypotheses, a clear understanding of what works, and a roadmap to implement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The best part? By staying embedded and working with real data, you avoid months of false starts and misaligned solutions.
          </p>
        </div>

        {/* Why It Works */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why this works</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Embedded expertise</h4>
              <p className="text-gray-700">
                I'm on-site with your teams, not consulting from a distance. I understand your real constraints, your culture, how your teams actually work—not through a client update call, but by being there.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Real data-driven</h4>
              <p className="text-gray-700">
                Everything is data-driven, grounded in how your teams actually work, not vendor assumptions or my hypotheses.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-accelerated speed</h4>
              <p className="text-gray-700">
                The speed is fundamentally different. Rapid iteration cycles using AI tools let you validate ideas and pivot weeks faster than traditional consulting allows.
              </p>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About me</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            My background gives me credibility across complex environments. I scaled Amazon's Product Ads from startup to $250M annual business—that's product thinking at scale. I've spent 15+ years leading product design and digital transformation at companies like Fidelity, understanding regulated industries and complex workflows. My environmental consulting background means I've spent time on job sites, understanding operational constraints. And my DARPA research experience gives me insight into defense, aerospace, and high-complexity team coordination.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to explore?</h3>
          <p className="text-gray-700 mb-6">
            If you're curious about discovering what's possible in your workflow, and whether a 4-5 week embedded engagement could unlock new opportunities, let's talk. I'm interested in understanding your biggest workflow challenges and exploring if this approach makes sense.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Get in touch
          </Link>
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
