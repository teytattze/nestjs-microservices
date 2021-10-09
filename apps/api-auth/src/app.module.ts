import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { apiAuthConfig } from '@app/common/config';

@Module({
  imports: [ConfigModule.forRoot({ load: [apiAuthConfig], isGlobal: true })],
})
export class AppModule {}
