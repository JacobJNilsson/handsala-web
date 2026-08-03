import { Product } from './types';
import { companyreport } from './data/companyreport';
import { knyta } from './data/knyta';
import { palette } from './data/palette';

export const products: Product[] = [
  knyta,
  companyreport,
  palette
];

export * from './types';
export { companyreport, knyta, palette };
