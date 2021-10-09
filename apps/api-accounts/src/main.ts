import { NestFactory } from '@nestjs/core';
import { AccountsModule } from './accounts.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AccountsModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 8001,
    },
  } as TcpOptions);

  await app.listen(() => console.log('Accounts microservices is listening'));
}
bootstrap();
