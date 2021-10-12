import { REFRESH_JWKS } from '@app/shared/patterns/auth.pattern';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtService } from './jwt.service';

@Controller()
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}

  @MessagePattern(REFRESH_JWKS)
  async refreshJwks() {
    console.log('Test');
    return await this.jwtService.refreshJwks();
  }
}
