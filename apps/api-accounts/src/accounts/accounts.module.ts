import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
  exports: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
