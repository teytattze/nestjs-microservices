import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { API_CLIENT_CONFIG } from '@app/common/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const HOST = configService.get(`${API_CLIENT_CONFIG}.server.host`);
  const PORT = configService.get(`${API_CLIENT_CONFIG}.server.port`);

  await app.listen(PORT, () =>
    console.log(`Api Client is listening on ${HOST}:${PORT}`),
  );
}
bootstrap().catch((err) => console.log(err));
