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
        className="px-6 py-3 bg-white text-cornflowerBlue font-medium rounded-lg hover:bg-opacity-90 transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  )
}
