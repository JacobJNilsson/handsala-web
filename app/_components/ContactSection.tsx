export default function ContactSection() {
  return (
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
  );
}
