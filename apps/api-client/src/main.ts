import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const HOST = configService.get('server.host');
  const PORT = configService.get('server.port');

  await app
    .listen(PORT, HOST)
    .then(() => console.log(`Api Client is listening on ${HOST}:${PORT}`))
    .catch((err) => console.log(err));
}
bootstrap();
