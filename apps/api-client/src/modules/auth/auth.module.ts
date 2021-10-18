import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AccountsService } from '../accounts/accounts.provider';
import { AuthService } from './auth.provider';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AccountsService, AuthService],
})
export class AuthModule {}
