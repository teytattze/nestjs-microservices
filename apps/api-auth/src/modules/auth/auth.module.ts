import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { JwtModule } from '../jwt/jwt.module';
import { join } from 'path';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({ jwkFilepath: join(process.cwd(), './secret.json') }),
    SessionsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
