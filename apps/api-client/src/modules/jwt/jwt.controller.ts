import { JWT_SERVICE } from '@app/shared/constants/providers.const';
import { REFRESH_JWKS } from '@app/shared/patterns/jwt.pattern';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('jwt')
export class JwtController {
  constructor(@Inject(JWT_SERVICE) private readonly jwtService: ClientProxy) {}

  @Get('/refresh-jwks')
  async refreshJwks() {
    return await this.jwtService.send(REFRESH_JWKS, {}).toPromise();
  }
}
