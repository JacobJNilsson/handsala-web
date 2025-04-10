export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center bg-cornflowerBlue z-n1">
      <div className="noise absolute z-0"/>
      <div className="flex-grow flex items-center">
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
      </div>
      <div className="w-full h-10 bg-repeat-x bg-beige-50" style={{ backgroundImage: "url('/curved-line.svg')", backgroundSize: "64px 64px" }}></div>
    </section>
  );
}
