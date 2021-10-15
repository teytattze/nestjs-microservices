import { HttpStatus } from '@nestjs/common';

export enum AccountErrorCode {
  ACCOUNT_NOT_FOUNDED = 1000,
  DUPLICATED_EMAIL = 1001,
}

export const accountErrors = {
  accountNotFounded: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: AccountErrorCode.ACCOUNT_NOT_FOUNDED,
    message: 'This account is not existed',
  },
  duplicatedEmail: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: AccountErrorCode.DUPLICATED_EMAIL,
    message: 'This email is already taken',
  },
};
