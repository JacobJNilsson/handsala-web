import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-beige-50 flex flex-col items-center justify-center text-slate-800 px-4">
      <h2 className="text-4xl sm:text-6xl font-mono font-bold mb-6 tracking-tighter">404 - Not Found</h2>
      <p className="text-xl mb-8 max-w-md text-center text-slate-600 font-light">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-slate-800 text-beige-50 font-mono text-sm rounded-md hover:bg-slate-700 transition-colors shadow-sm"
      >
        Return Home
      </Link>
    </div>
  )
}
