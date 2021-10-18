import { accountErrors } from '@app/shared/errors/accounts.error';
import { defaultErrors } from '@app/shared/errors/default.error';
import { PrismaErrorCode } from '@app/shared/errors/prisma.error';
import { RpcException } from '@nestjs/microservices';

export const handleAccountsRepositoryError = (err: any) => {
  switch (err.code) {
    case PrismaErrorCode.UNIQUE:
      throw new RpcException(accountErrors.duplicatedEmail);
    case PrismaErrorCode.NOT_FOUNDED:
      throw new RpcException(accountErrors.accountNotFounded);
    default:
      throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
  }
};
