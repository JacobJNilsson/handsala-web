import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palette - Puzzle Game | Handsala',
  description: 'A challenging and beautiful puzzle game. What if Sudoku and coloring books had a baby? Play it in the browser or get it on Google Play.',
  openGraph: {
    title: 'Palette - Puzzle Game',
    description: 'A challenging and beautiful puzzle game combining Sudoku and coloring.',
    images: ['/palette-filled-game.png'],
  },
};

export default function PaletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

