import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vellum px-4 text-ink">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-vermillion">
        404
      </p>
      <h2 className="display-serif mb-6 text-center text-5xl sm:text-7xl">
        Nothing here.
      </h2>
      <p className="mb-10 max-w-md text-center text-lg italic text-ink-faint">
        This page doesn&apos;t exist, or it did and we never shook on it.
      </p>
      <Link
        href="/"
        className="bg-ink px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-vellum transition-colors hover:bg-vermillion"
      >
        Back home
      </Link>
    </div>
  )
}
