import { AxiosResponse } from 'axios';

export class IResponseError extends Error {
  errors: {};
  status: number = 401;

  constructor(message: string, status: number = 401, errors?: {}) {
    super();
    this.message = message;
    this.errors = errors || {};
    this.status = status;
  }
}

export type AxiosApiResponse<T> = AxiosResponse<T | IResponseError>;
export type ApiResponse<T> = T | IResponseError;

export function responseError(
  message: string,
  status: number = 401,
  errors?: Record<string, any>
): IResponseError {
  return new IResponseError(message, status, errors);
}
