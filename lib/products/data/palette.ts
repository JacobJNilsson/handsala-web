import { Product } from '../types';

export const palette: Product = {
  id: 'palette',
  title: 'Palette',
  description: 'A passion project that asks: "What if Sudoku and coloring books had a baby?" It\'s a puzzle game with randomly generated areas where you fill in colors following specific rules. Each puzzle is unique, so you\'ll never get bored (or I\'ll give you your money back... wait, it\'s free).',
  category: 'Puzzle Game',
  categoryColor: 'bg-slate-700',
  image: '/palette-filled-game.png',
  imageAlt: 'Screenshot of Pallet game showing filled puzzle state',
  url: '/palette',
  features: [
    'Fresh puzzles daily (I don\'t sleep, I generate puzzles)',
    'Multiple grid sizes for when you\'re feeling extra smart',
    'Clean, colorful design with no mandatory ads or in-app purchases'
  ],
  technologies: [
    { name: 'Flutter', color: 'text-slate-700' },
    { name: 'Dart', color: 'text-slate-700' },
    { name: 'Dancing Links', color: 'text-slate-700' }
  ]
};
