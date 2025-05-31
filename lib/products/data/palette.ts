import { Product } from '../types';

export const palette: Product = {
  id: 'palette',
  title: 'Palette',
  description: 'A passion project that asks: "What if Sudoku and coloring books had a baby?" It\'s a puzzle game with randomly generated areas where you fill in colors following specific rules. Each puzzle is unique, so you\'ll never get bored (or I\'ll give you your money back... wait, it\'s free).',
  category: 'Puzzle Game',
  categoryColor: 'bg-coral',
  image: '/palette-filled-game.png',
  imageAlt: 'Screenshot of Pallet game showing filled puzzle state',
  url: 'https://play.google.com/store/apps/details?id=se.handsala.spectrum&pcampaignid=web_share',
  features: [
    'Fresh puzzles daily (I don\'t sleep, I generate puzzles)',
    'Multiple grid sizes for when you\'re feeling extra smart',
    'Clean, colorful design with no mandatory ads or in-app purchases'
  ],
  technologies: [
    { name: 'Flutter', color: 'text-orangeRed' },
    { name: 'Dart', color: 'text-cornflowerBlue' },
    { name: 'Dancing Links', color: 'text-cornflowerBlue' }
  ]
};
