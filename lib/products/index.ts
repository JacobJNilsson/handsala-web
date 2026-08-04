import { Product } from './types';
import { companyreport } from './data/companyreport';
import { knyta } from './data/knyta';
import { palette } from './data/palette';
import { wealthtracker } from './data/wealthtracker';

export const products: Product[] = [
  knyta,
  wealthtracker,
  companyreport,
  palette
];

export * from './types';
export { companyreport, knyta, palette, wealthtracker };
