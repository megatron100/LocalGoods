export interface AuthResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: AuthData;
}

export interface AuthData {
  id: string;
  email: string;
  role: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
