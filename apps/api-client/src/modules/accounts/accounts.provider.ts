import { API_ACCOUNTS_CONFIG } from '@app/common/config';
import { ACCOUNTS_SERVICE } from '@app/shared/constants/providers.const';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const AccountsService = {
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
} as Provider;
