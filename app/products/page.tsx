export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-beige-50">
      <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-beige-900 mb-4 text-center">
          Our Portfolio
        </h1>
        <p className="text-xl text-beige-700 mb-12 text-center max-w-2xl mx-auto">
          Innovative solutions crafted with trust and precision
        </p>

        <div className="space-y-16">
          {/* Featured Project */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-beige-200">
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-64 md:h-full bg-beige-100">
                <div className="absolute inset-0 flex items-center justify-center text-beige-400">
                  [Project Screenshot]
                </div>
              </div>

              <div className="p-8">
                <div className="mb-2">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    Mobile Game
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                  Project Name
                </h2>
                <p className="text-beige-800 mb-6 leading-relaxed">
                  An engaging mobile game that combines strategy and skill. Players navigate through
                  challenging levels while solving puzzles and collecting rewards. Built with Unity
                  and featuring stunning graphics and smooth gameplay mechanics.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-700 mb-2">
                      Key Features
                    </h3>
                    <ul className="list-disc list-inside text-beige-800 space-y-1">
                      <li>Real-time multiplayer battles</li>
                      <li>Progressive skill system</li>
                      <li>Cross-platform cloud saves</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-700 mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-beige-100 text-beige-800 px-3 py-1 rounded-full text-sm">
                        Unity
                      </span>
                      <span className="bg-beige-100 text-beige-800 px-3 py-1 rounded-full text-sm">
                        C#
                      </span>
                      <span className="bg-beige-100 text-beige-800 px-3 py-1 rounded-full text-sm">
                        Firebase
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Future Projects Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">
              More Projects Coming Soon
            </h2>
            <p className="text-beige-700">
              We&apos;re constantly working on new and exciting projects.
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
