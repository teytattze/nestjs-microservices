import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { apiAccountsConfig } from '@app/common/config';

@Module({
  imports: [
    AccountsModule,
    ConfigModule.forRoot({ load: [apiAccountsConfig], isGlobal: true }),
  ],
})
export class AppModule {}
