import { Module } from '@nestjs/common';
import { PrismaService } from '@app/common/database/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
