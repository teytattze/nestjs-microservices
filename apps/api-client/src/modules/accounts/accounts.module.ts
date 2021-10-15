import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.provider';

@Module({
  imports: [JwtModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
