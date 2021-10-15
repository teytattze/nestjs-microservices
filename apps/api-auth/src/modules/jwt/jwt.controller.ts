import { REFRESH_JWKS, VERIFY_JWT } from '@app/shared/patterns/jwt.pattern';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtService } from './jwt.service';

@Controller()
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}

  @MessagePattern(VERIFY_JWT)
  async verifyJwt({ jwt }: { jwt: string }) {
    return await this.jwtService.verifyJwt(jwt);
  }

  @MessagePattern(REFRESH_JWKS)
  async refreshJwks() {
    return await this.jwtService.refreshJwks();
  }
}
