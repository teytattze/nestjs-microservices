import { PrismaService } from '@app/common/database/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { handleAccountRepositoryError } from './accounts.lib';

@Injectable()
export class AccountsRepository {
  private logger: Logger = new Logger(AccountsRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAccountByEmailWithSession(email: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { email },
        include: { session: true },
      });
    } catch (err) {
      this.logger.error(err);
      handleAccountRepositoryError(err);
    }
  }

  async getAccountByIdWithSession(id: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { id },
        include: { session: true },
      });
    } catch (err) {
      this.logger.error(err);
      handleAccountRepositoryError(err);
    }
  }
}
