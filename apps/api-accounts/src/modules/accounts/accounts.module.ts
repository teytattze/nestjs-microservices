import { PrismaService } from '@app/common/database/prisma.service';
import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository, PrismaService],
  exports: [AccountsService],
})
export class AccountsModule {}
