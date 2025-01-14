export default function ContactPage() {
  return (
    <div className="min-h-screen bg-beige-50">
      <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-beige-900 mb-12 text-center">
          Contact Us
        </h1>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-beige-200">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                Company Information
              </h2>
              <div className="space-y-2 text-beige-800">
                <p>Handsala AB</p>
                <p>123 Innovation Street</p>
                <p>Stockholm, Sweden</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                Contact Details
              </h2>
              <div className="space-y-2 text-beige-800">
                <p>Email: contact@handsala.com</p>
                <p>Phone: +46 123 456 789</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                Business Hours
              </h2>
              <div className="space-y-2 text-beige-800">
                <p>Monday - Friday: 9:00 AM - 5:00 PM CET</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
