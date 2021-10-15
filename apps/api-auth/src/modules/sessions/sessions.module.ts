import { PrismaService } from '@app/common/database/prisma.service';
import { Module } from '@nestjs/common';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsService, SessionsRepository, PrismaService],
  exports: [SessionsService],
})
export class SessionsModule {}
