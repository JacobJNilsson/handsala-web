import { Product } from '../types';

export const wealthtracker: Product = {
  id: 'wealthtracker',
  title: 'Wealth Tracker',
  description: 'A private dashboard that turns scattered accounts into one honest picture of net worth, debt included. Open any account, or all of them, for the ledger and the portfolio behind the number. Then project forward: pick a trend model, set your own rate, see where the line goes. I built it to test Knyta against something real. Still under development, behind a Google sign-in.',
  category: 'Personal Finance',
  categoryColor: 'bg-slate-800',
  image: '/images/wealth-tracker.webp',
  imageAlt: 'A red curve rises and falls across hand-drawn graph paper',
  url: 'https://wealth-tracker-indol-xi.vercel.app/',
  features: [
    'Debt is shown as plainly as assets',
    'Projections you steer: trend models, your own assumptions, your own rate',
    'Knyta ingestion is next: drop any file, it lands in the data'
  ],
  technologies: [
    { name: 'React', color: 'text-slate-700' },
    { name: 'TypeScript', color: 'text-slate-700' },
    { name: 'Supabase', color: 'text-slate-700' }
  ]
};
