import { User } from './product';

export interface UserUpdateResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: User;
}
