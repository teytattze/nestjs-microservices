import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { API_ACCOUNTS_CONFIG } from '@app/common/config';
import { RpcExceptionFilter } from '@app/common/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new RpcExceptionFilter());

  const configService = app.get(ConfigService);
  const HOST = configService.get(`${API_ACCOUNTS_CONFIG}.server.host`);
  const PORT = configService.get(`${API_ACCOUNTS_CONFIG}.server.port`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: HOST,
      port: PORT,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(PORT, () =>
    console.log(`Api-accounts is listening on ${HOST}:${PORT}`),
  );
}
bootstrap().catch((err) => console.log(err));
