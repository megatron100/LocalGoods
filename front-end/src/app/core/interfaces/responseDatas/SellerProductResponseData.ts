import { IProduct } from '../product';

export interface SellerProductResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: IProduct[];
}

export interface SellerProductItem {
  name: string;
  photo: string;
  category: string;
  price: number;
  shortDesc: string;
  longDescription: string;
  id: number;
}
