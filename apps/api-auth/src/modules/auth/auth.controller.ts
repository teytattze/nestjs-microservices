import { LOGIN, REFRESH_ACCESS } from '@app/shared/patterns/auth.pattern';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessDto } from './dto/refresh-access.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(LOGIN)
  async login(@Payload() data: LoginDto) {
    return await this.authService.login({ ...data });
  }

  @MessagePattern(REFRESH_ACCESS)
  async refreshAccess(@Payload() data: RefreshAccessDto) {
    return await this.authService.refreshAccess({ ...data });
  }
}
