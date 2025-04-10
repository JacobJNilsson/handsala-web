import Image from 'next/image';

export default function ProductsSection() {
  return (
    <section id="products" className="min-h-screen py-16 flex items-center justify-center bg-beige-50 z-2 -mt-2">
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
              <Image
                src="/palette-filled-game.png"
                alt="Screenshot of Pallet game showing filled puzzle state"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="p-8">
              <div className="mb-2">
                <span className="inline-block bg-coral text-white text-sm font-medium px-3 py-1 rounded-full">
                  Puzzle Game
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                Palette
              </h3>
              <p className="text-beige-800 mb-6 leading-relaxed">
                A unique puzzle game that combines elements of Sudoku with an innovative twist on area constraints.
                Each puzzle features randomly generated areas and color-based gameplay, making every level both
                visually appealing and intellectually challenging. Built with Flutter for cross-platform compatibility
                and featuring sophisticated algorithms for puzzle generation and solving.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                    Key Features
                  </h4>
                  <ul className="list-disc list-inside text-beige-800 space-y-1">
                    <li>Daily puzzles with unique solutions</li>
                    <li>Multiple grid sizes and difficulty levels</li>
                    <li>Cross-platform support (iOS, Android, Web)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-beige-100 text-orangeRed px-3 py-1 rounded-full text-sm">
                      Flutter
                    </span>
                    <span className="bg-beige-100 text-cornflowerBlue px-3 py-1 rounded-full text-sm">
                      Dart
                    </span>
                    <span className="bg-beige-100 text-cornflowerBlue px-3 py-1 rounded-full text-sm">
                      Dancing Links
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
