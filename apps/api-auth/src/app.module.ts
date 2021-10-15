import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { apiAuthConfig } from '@app/common/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ load: [apiAuthConfig], isGlobal: true }),
  ],
})
export class AppModule {}
