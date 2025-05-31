import { Product } from './types';
import { companyreport } from './data/companyreport';
import { palette } from './data/palette';

export const products: Product[] = [
  companyreport,
  palette
];

export * from './types';
export { companyreport, palette };
