import { PrismaService } from '@app/common/database/prisma.service';
import { Module } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService, AccountsRepository, PrismaService],
  exports: [AccountsService],
})
export class AccountsModule {}
