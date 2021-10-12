export interface IGeneralErrorResponse {
  statusCode: number;
  errorCode?: string;
  message?: string;
  description?: string | string[] | unknown;
}
