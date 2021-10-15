import { LOGIN, LOGOUT } from '@app/shared/patterns/auth.pattern';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(LOGIN)
  async login({ email, password }: LoginDto) {
    return await this.authService.login({ email, password });
  }

  @MessagePattern(LOGOUT)
  async logout() {
    return null;
  }
}
