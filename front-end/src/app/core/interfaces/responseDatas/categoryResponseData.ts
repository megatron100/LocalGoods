import { ProductCategory } from '../product';

export interface CategoryResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: ProductCategory[];
}
