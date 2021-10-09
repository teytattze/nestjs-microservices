import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  apiAccountsConfig,
  apiAuthConfig,
  apiClientConfig,
} from '@app/common/config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [apiClientConfig, apiAccountsConfig, apiAuthConfig],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
