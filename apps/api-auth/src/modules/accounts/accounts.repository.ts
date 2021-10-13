import { PrismaService } from '@app/common/database/prisma.service';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AccountsRepository {
  private logger: Logger = new Logger();
  constructor(private readonly prisma: PrismaService) {}

  async getAccountByEmail(email: string) {
    try {
      return await this.prisma.account.findUnique({
        where: { email },
        include: { session: true },
      });
    } catch (err) {
      this.logger.error(err);
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  }
}
