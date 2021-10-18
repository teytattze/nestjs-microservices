import { authErrors } from '@app/shared/errors/auth.error';
import { defaultErrors } from '@app/shared/errors/default.error';
import { PrismaErrorCode } from '@app/shared/errors/prisma.error';
import { RpcException } from '@nestjs/microservices';

export const handleSessionsRepositoryError = (err: any) => {
  switch (err.code) {
    case PrismaErrorCode.NOT_FOUNDED:
      throw new RpcException(authErrors.sessionNotFounded);
    default:
      throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
  }
};
