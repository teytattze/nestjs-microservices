import { PrismaService } from '@app/common/database/prisma.service';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SessionsRepository {
  private logger: Logger = new Logger(SessionsRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async getSessionById(id: string) {
    try {
      return await this.prisma.session.findUnique({ where: { id } });
    } catch (err) {
      this.logger.error(err);
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  }

  async updateSessionById(id: string, data: any) {
    try {
      return await this.prisma.session.update({
        where: { id },
        data,
      });
    } catch (err) {
      this.logger.log(err);
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  }
}
