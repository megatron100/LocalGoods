export interface ResponseData<T> {
  responseId: string;
  status: boolean;
  message: string;
  data: T;
}

