import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palette - Puzzle Game',
  description: 'A challenging and beautiful puzzle game combining Sudoku and coloring.',
};

export default function PalettePlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

