import { DynamicModule, Module } from '@nestjs/common';
import { JWT_MODULE_CONFIG_OPTIONS } from './jwt.const';
import { JwtController } from './jwt.controller';
import { IJwtModuleConfigOptions } from './jwt.interface';
import { JwtService } from './jwt.service';

@Module({
  controllers: [JwtController],
  providers: [JwtService],
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
