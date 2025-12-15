import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palette - Puzzle Game | Handsala',
  description: 'A challenging and beautiful puzzle game. What if Sudoku and coloring books had a baby? Available on iOS web and Android Play Store.',
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

