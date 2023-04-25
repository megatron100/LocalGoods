import { Address, IProduct, User } from '../product';

export interface PendingOrderResponseData {
  status: boolean;
  message: string;
  data?: Order[] | undefined;
}

export interface Order {
  orderItem: IProduct;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  dropAddress: Address;
  customer: User;
  orderDate: string;
  id: number;
}
