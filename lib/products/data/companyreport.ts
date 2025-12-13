import { Product } from '../types';

export const companyreport: Product = {
  id: 'companyreport',
  title: 'CompanyReport.ai',
  description: 'Currently a landing page for testing market interest in comprehensive company analysis. The vision is to provide detailed insights about any company\'s business model, competitive positioning, and financial performance without the hours of research. Perfect for investors, consultants, and anyone who needs to understand companies quickly and thoroughly.',
  category: 'Business Intelligence',
  categoryColor: 'bg-slate-800',
  image: '/images/blog/company-report.png',
  imageAlt: 'CompanyReport.ai landing page screenshot',
  url: 'https://companyreport.ai',
  features: [
    'Testing market demand for automated company analysis',
    'Collecting feedback on desired features and insights',
    'Building towards comprehensive business intelligence platform'
  ],
  technologies: [
    { name: 'Next.js', color: 'text-slate-700' },
    { name: 'Tailwind', color: 'text-slate-700' },
    { name: 'Supabase', color: 'text-slate-700' }
  ]
};
