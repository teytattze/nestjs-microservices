import { IGeneralErrorResponse } from '@app/shared/interfaces/errors.interface';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(
    err: Error | IGeneralErrorResponse | HttpException,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    const responseError = createGeneralExceptionError(err);
    response.status(responseError.statusCode).send({
      ...responseError,
    });
  }
}

const createGeneralExceptionError = (error: any): IGeneralErrorResponse => {
  if (error instanceof HttpException) {
    const errorResponse = error.getResponse() as IGeneralErrorResponse;

    return {
      statusCode: errorResponse.statusCode,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message,
      description: errorResponse.description,
    };
  }

  if (typeof error === 'object') {
    return {
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
      description: error.description,
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  };
};
