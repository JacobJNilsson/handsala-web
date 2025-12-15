import Image from 'next/image';
import Link from 'next/link';

export default function PalettePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7EF] p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 relative h-64 w-full max-w-sm mx-auto">
          <Image
            src="/palette-filled-game.png"
            alt="Palette game screenshot"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-mono font-bold text-slate-800 mb-4">
          Palette is optimized for mobile
        </h1>
        <p className="text-slate-600 font-light text-lg mb-8">
          The game is designed for touch controls and portrait orientation. Some features may not work perfectly on desktop browsers.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="https://play.google.com/store/apps/details?id=se.handsala.spectrum&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-mono text-sm rounded-md hover:bg-slate-700 transition-colors"
            >
              Get it on Google Play
            </Link>
            <Link
              href="/palette/play"
              className="inline-flex items-center px-6 py-3 bg-white text-slate-800 font-mono text-sm rounded-md border-2 border-slate-800 hover:bg-slate-50 transition-colors"
            >
              Try Web Version
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

