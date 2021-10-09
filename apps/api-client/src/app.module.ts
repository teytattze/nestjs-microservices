import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { apiClientConfig } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiClientConfig],
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'ACCOUNTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 8001,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
