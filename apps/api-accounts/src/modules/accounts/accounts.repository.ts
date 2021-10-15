import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common/database/prisma.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';
import { RpcException } from '@nestjs/microservices';
import { accountErrors } from '@app/shared/errors/accounts.error';
import { PrismaErrorCode } from '@app/shared/errors/prisma.error';
import { defaultErrors } from '@app/shared/errors/default.error';

@Injectable()
export class AccountsRepository {
  private logger: Logger = new Logger(AccountsRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAllAccounts() {
    try {
      return await this.prisma.account.findMany({});
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async createAccount(data: RegisterAccountDto) {
    try {
      return await this.prisma.account.create({
        data: {
          ...data,
          session: {
            create: {
              token: null,
              expires: null,
            },
          },
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async getAccountById(id: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAccountById(id: string, data: UpdateAccountByIdDto) {
    try {
      return await this.prisma.account.update({
        where: { id },
        data,
      });
    } catch (err) {
      this.logger.error(err);
      console.log(err);
      switch (err.code) {
        case PrismaErrorCode.UNIQUE:
          throw new RpcException(accountErrors.duplicatedEmail);
        case PrismaErrorCode.NOT_FOUNDED:
          throw new RpcException(accountErrors.accountNotFounded);
        default:
          throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async deleteAccountById(id: string) {
    try {
      return await this.prisma.account.delete({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      switch (err.code) {
        case PrismaErrorCode.NOT_FOUNDED:
          throw new RpcException(accountErrors.accountNotFounded);
        default:
          throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getAccountByEmail(email: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { email },
      });
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(defaultErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
