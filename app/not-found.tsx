import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cornflowerBlue flex flex-col items-center justify-center text-white px-4">
      <h2 className="text-4xl sm:text-6xl font-bold mb-6">404 - Page Not Found</h2>
      <p className="text-xl mb-8 max-w-md text-center">
        Oops! The page you&apos;re looking for seems to have wandered off.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-white/90 backdrop-blur-sm text-cornflowerBlue font-medium rounded-2xl hover:bg-white transition-all duration-300 shadow-lg border border-white/80 hover:shadow-xl hover:scale-105"
      >
        Return Home
      </Link>
    </div>
  )
}
