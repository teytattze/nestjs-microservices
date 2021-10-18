import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common/database/prisma.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';
import { handleAccountsRepositoryError } from './accounts.lib';

@Injectable()
export class AccountsRepository {
  private logger: Logger = new Logger(AccountsRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAllAccounts() {
    try {
      return await this.prisma.account.findMany({});
    } catch (err) {
      this.logger.error(err);
      handleAccountsRepositoryError(err);
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
      handleAccountsRepositoryError(err);
    }
  }

  async getAccountById(id: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      handleAccountsRepositoryError(err);
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
      handleAccountsRepositoryError(err);
    }
  }

  async deleteAccountById(id: string) {
    try {
      return await this.prisma.account.delete({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      handleAccountsRepositoryError(err);
    }
  }

  async getAccountByEmail(email: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { email },
      });
    } catch (err) {
      this.logger.error(err);
      handleAccountsRepositoryError(err);
    }
  }
}
