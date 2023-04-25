import { Address, IProduct, User } from '../product';

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
