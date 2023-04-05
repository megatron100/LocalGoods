import { ProductData } from '../product';

export interface ProductResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: ProductData;
}
