"use client"

import { useEffect } from 'react';

export default function PalettePlayPage() {
  useEffect(() => {
    // Redirect to the actual Flutter web app
    window.location.replace('/palette/play/index.html');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7EF] p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
        </div>
        <h1 className="text-2xl font-mono font-bold text-slate-800 mb-2">
          Loading Palette...
        </h1>
      </div>
    </div>
  );
}

