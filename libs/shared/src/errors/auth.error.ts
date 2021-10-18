import { HttpStatus } from '@nestjs/common';

export enum AuthErrorCode {
  WRONG_CREDENTIALS = 1000,
  ACCESS_TOKEN_EXPIRED = 1001,
  ACCESS_TOKEN_INVALID = 1002,
  REFRESH_TOKEN_EXPIRED = 1003,
  REFRESH_TOKEN_INVALID = 1004,
  SESSION_NOT_FOUNDED = 1005,
  SESSION_INVALID = 1006,
}

export const authErrors = {
  wrongCredentials: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.WRONG_CREDENTIALS,
    message: 'Unauthorized',
  },
  accessTokenExpired: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.ACCESS_TOKEN_EXPIRED,
    message: 'Unauthorized',
  },
  accessTokenInvalid: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.ACCESS_TOKEN_INVALID,
    message: 'Unauthorized',
  },
  refreshTokenExpired: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.REFRESH_TOKEN_EXPIRED,
    message: 'Unauthorized',
  },
  refreshTokenInvalid: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.REFRESH_TOKEN_EXPIRED,
    message: 'Unauthorized',
  },
  sessionNotFounded: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.SESSION_NOT_FOUNDED,
    message: 'Unauthorized',
  },
  sessionInvalid: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: AuthErrorCode.SESSION_INVALID,
    message: 'Unauthorized',
  },
};
