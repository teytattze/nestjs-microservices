import { NestFactory } from '@nestjs/core';
import { ApiAuthModule } from './api-auth.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiAuthModule);
  await app.listen(3000);
}
bootstrap();
