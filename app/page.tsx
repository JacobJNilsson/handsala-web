export default async function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-cornflowerBlue z-n1">
        <div className="noise absolute z-0"/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center z-1">
            <blockquote className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-8 mt-4 sm:mt-8 lora-regular">
              &ldquo;Handsala:  <br />
              <span className="text-3xl sm:text-5xl md:text-7xl">(að), v. to make over (confirm) by shaking hands.&rdquo;</span>
              <br />
              <span className="text-base sm:text-lg md:text-xl block mt-4">- A Concise Dictionary of Old Icelandic (Geir Zoëga)</span>
            </blockquote>

            <div className="bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-lg border border-blue hover:shadow-2xl transition-shadow duration-300 mt-8">
              <p className="text-beige-800 leading-relaxed text-base sm:text-lg">
                At Handsala AB, we partner with clients to implement innovative solutions that deliver real value. We build strong relationships based on trust and collaboration, tailoring each solution to meet unique client needs. Our goal is to empower businesses with technology that enhances operations and supports growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-8 bg-repeat-x" style={{ backgroundImage: "url('/curved-line.svg')", backgroundSize: "64px 64px", padding: "0", margin: "0", position: "relative", top: "-1px" }}></div>

      {/* Products Section */}
      <section id="products" className="min-h-screen py-16 flex items-center justify-center bg-beige-50 z-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-cornflowerBlue mb-4 text-center">
            Our Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-beige-800 mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
            Innovative solutions crafted with trust and precision
          </p>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-orangeRed hover:shadow-2xl transition-shadow duration-300">
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-48 sm:h-64 md:h-full bg-beige-100">
                <div className="absolute inset-0 flex items-center justify-center text-beige-400">
                  [Project Screenshot]
                </div>
              </div>

              <div className="p-8">
                <div className="mb-2">
                  <span className="inline-block bg-coral text-white text-sm font-medium px-3 py-1 rounded-full">
                    Mobile Game
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                  Project Name
                </h3>
                <p className="text-beige-800 mb-6 leading-relaxed">
                  An engaging mobile game that combines strategy and skill. Players navigate through
                  challenging levels while solving puzzles and collecting rewards. Built with Unity
                  and featuring stunning graphics and smooth gameplay mechanics.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                      Key Features
                    </h4>
                    <ul className="list-disc list-inside text-beige-800 space-y-1">
                      <li>Real-time multiplayer battles</li>
                      <li>Progressive skill system</li>
                      <li>Cross-platform cloud saves</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-beige-100 text-orangeRed px-3 py-1 rounded-full text-sm">
                        Unity
                      </span>
                      <span className="bg-beige-100 text-cornflowerBlue px-3 py-1 rounded-full text-sm">
                        C#
                      </span>
                      <span className="bg-beige-100 text-cornflowerBlue px-3 py-1 rounded-full text-sm">
                        Firebase
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex items-center justify-center bg-beige-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-beige-900 mb-12 text-center">
            Contact Us
          </h2>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-beige-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                  Company Information
                </h3>
                <div className="space-y-2 text-beige-800">
                  <p>Handsala AB</p>
                  <p>413 10, Olivedalsgatan 16</p>
                  <p>Gothenburg, Sweden</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                  Contact Details
                </h3>
                <div className="space-y-2 text-beige-800">
                  <p>Email: contact@handsala.com</p>
                  <p>Phone: +46 722 428 245</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
