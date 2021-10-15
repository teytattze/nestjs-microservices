import { JWT_MODULE_CONFIG_OPTIONS } from '@app/shared/constants/jwt.const';
import { IJwtModuleConfigOptions } from '@app/shared/interfaces/jwt.interface';
import { DynamicModule, Module } from '@nestjs/common';
import { JwtController } from './jwt.controller';
import { JwtService } from './jwt.service';

@Module({
  controllers: [JwtController],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {
  static register(options: IJwtModuleConfigOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        JwtService,
        {
          provide: JWT_MODULE_CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [JwtService],
    };
  }
}
