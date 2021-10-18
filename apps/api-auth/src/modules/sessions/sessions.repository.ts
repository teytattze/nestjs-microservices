import { PrismaService } from '@app/common/database/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { handleSessionsRepositoryError } from './sessions.lib';

@Injectable()
export class SessionsRepository {
  private logger: Logger = new Logger(SessionsRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async getSessionById(id: string) {
    try {
      return await this.prisma.session.findUnique({ where: { id } });
    } catch (err) {
      this.logger.error(err);
      handleSessionsRepositoryError(err);
    }
  }

  async updateSessionById(id: string, data: any) {
    try {
      return await this.prisma.session.update({
        where: { id },
        data,
      });
    } catch (err) {
      this.logger.error(err);
      handleSessionsRepositoryError(err);
    }
  }
}
