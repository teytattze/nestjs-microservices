export interface IGeneralErrorResponse {
  statusCode: number;
  errorCode?: number;
  message?: string;
  description?: string | string[] | unknown;
}
