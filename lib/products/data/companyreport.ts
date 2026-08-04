import { Product } from '../types';

export const companyreport: Product = {
  id: 'companyreport',
  title: 'Company Report',
  description: 'The vision: any company\'s business model, positioning, and financials without the hours of research. The landing page tested the market. Paused, not abandoned.',
  category: 'Business Intelligence',
  categoryColor: 'bg-slate-800',
  image: '/images/blog/company-report.png',
  imageAlt: 'An illustrated hand passes a paper report to another hand',
  url: 'https://companyreport.ai',
  features: [
    'Tested market demand for automated company analysis',
    'The landing page is still live'
  ],
  technologies: [
    { name: 'Next.js', color: 'text-slate-700' },
    { name: 'Tailwind', color: 'text-slate-700' },
    { name: 'Supabase', color: 'text-slate-700' }
  ]
};
