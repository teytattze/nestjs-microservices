import { Module } from '@nestjs/common';
import { ACCOUNTS_SERVICE } from '@app/shared/constants';
import { ConfigService } from '@nestjs/config';
import { API_ACCOUNTS_CONFIG } from '@app/common/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AccountsController } from './accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [
    {
      provide: ACCOUNTS_SERVICE,
      useFactory: (configService: ConfigService) => {
        const serverConfig = configService.get(`${API_ACCOUNTS_CONFIG}.server`);
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: serverConfig.host,
            port: serverConfig.port,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AccountsModule {}
