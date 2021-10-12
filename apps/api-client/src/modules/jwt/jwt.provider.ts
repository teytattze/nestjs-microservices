import { API_AUTH_CONFIG } from '@app/common/config';
import { JWT_SERVICE } from '@app/shared/constants/providers.const';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const JwtService = {
  provide: JWT_SERVICE,
  useFactory: (configService: ConfigService) => {
    const serverConfig = configService.get(`${API_AUTH_CONFIG}.server`);
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
