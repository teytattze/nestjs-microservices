import { HttpStatus } from '@nestjs/common';

export const defaultErrors = {
  NOT_FOUNDED: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Not founded',
  },
  BAD_REQUEST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Bad request',
  },
  UNAUTHORIZED: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
};
