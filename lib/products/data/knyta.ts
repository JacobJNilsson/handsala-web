import { Product } from '../types';

export const knyta: Product = {
  id: 'knyta',
  title: 'Knyta',
  description: 'Knyta is an AI-assisted data-ingestion engine. It turns the CSVs, exports and one-off files other people send you into clean rows in your database — through pipelines you can read, replay and trust. And when a sender changes their format, Knyta proposes the fix. You approve it. Nobody rewrites scripts at midnight.',
  category: 'Data Ingestion',
  categoryColor: 'bg-slate-800',
  image: '/images/knyta.webp',
  imageAlt: 'Two hands tie ropes together with a square knot',
  url: 'https://knyta.net',
  features: [
    'AI writes the pipeline once. Boring, deterministic code runs it forever',
    'Nothing new touches production without approval',
    'Postgres works today. APIs and other databases are on the way'
  ],
  technologies: [
    { name: 'Go', color: 'text-slate-700' },
    { name: 'Python', color: 'text-slate-700' },
    { name: 'Postgres', color: 'text-slate-700' }
  ]
};
