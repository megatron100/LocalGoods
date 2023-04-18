import { IProduct } from '../product';
import { User } from '../../../pages/auth/models/user.model';

export interface CartResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: CartData;
}

export interface CartData {
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface CartItem {
  id: number;
  product: IProduct;
  quantity: number;
  totalAmount: number;
  user?: User;
}
