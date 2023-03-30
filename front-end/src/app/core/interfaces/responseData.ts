export interface ResponseData {
  responseId: string;
  status: boolean;
  message: string;
  data: Record<string, unknown> | null;
}
