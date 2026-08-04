import { Product } from '../types';

export const palette: Product = {
  id: 'palette',
  title: 'Palette',
  description: 'A passion project: Sudoku crossed with a coloring book. The board is split into random areas, and you fill them with colors that follow a set of rules. Every puzzle is generated fresh, so you never solve the same one twice.',
  category: 'Puzzle Game',
  categoryColor: 'bg-slate-700',
  image: '/palette-filled-game.png',
  imageAlt: 'Screenshot of a filled Palette puzzle',
  url: '/palette',
  features: [
    'Fresh puzzles every day',
    'Multiple grid sizes for when you\'re looking for a challenge',
    'Clean, colorful design with no mandatory ads or in-app purchases'
  ],
  technologies: [
    { name: 'Flutter', color: 'text-slate-700' },
    { name: 'Dart', color: 'text-slate-700' },
    { name: 'Dancing Links', color: 'text-slate-700' }
  ]
};
