import { Prisma } from '.prisma/client';
import { PrismaService } from '@app/common/database/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSessionById(id: string) {
    try {
      return await this.prisma.session.findUnique({ where: { id } });
    } catch (err) {
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
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  }
}
