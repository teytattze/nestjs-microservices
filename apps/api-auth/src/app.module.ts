import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { apiAuthConfig } from '@app/common/config';
import { AuthModule } from './modules/auth/auth.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ConfigModule.forRoot({ load: [apiAuthConfig], isGlobal: true }),
  ],
})
export class AppModule {}
