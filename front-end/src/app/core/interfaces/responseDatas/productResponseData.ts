import { IProduct, ProductData } from '../product';

export interface ProductResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: IProduct;
}

export interface ProductsResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: ProductData;
}
