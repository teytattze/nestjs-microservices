import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from '@app/shared/constants';
import { ConfigService } from '@nestjs/config';
import { API_AUTH_CONFIG } from '@app/common/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
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
    },
  ],
})
export class AuthModule {}
