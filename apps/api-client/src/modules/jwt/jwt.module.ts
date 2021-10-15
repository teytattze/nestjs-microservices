import { Module } from '@nestjs/common';
import { JwtController } from './jwt.controller';
import { JwtService } from './jwt.provider';

@Module({
  controllers: [JwtController],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
