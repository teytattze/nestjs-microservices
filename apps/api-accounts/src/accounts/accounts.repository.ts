import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common/database/prisma.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';

@Injectable()
export class AccountsRepository {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {}

  async getAllAccounts() {
    try {
      return await this.prisma.account.findMany();
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException();
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
      throw new BadRequestException();
    }
  }

  async getAccountById(id: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException();
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
      throw new BadRequestException();
    }
  }

  async deleteAccountById(id: string) {
    try {
      return await this.prisma.account.delete({
        where: { id },
      });
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException();
    }
  }
}
