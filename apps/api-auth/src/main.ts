import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { API_AUTH_CONFIG } from '@app/common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const HOST = configService.get(`${API_AUTH_CONFIG}.server.host`);
  const PORT = configService.get(`${API_AUTH_CONFIG}.server.port`);

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
