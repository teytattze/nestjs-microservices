import { LOGIN } from '@app/shared/patterns/auth.pattern';
import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ExceptionFilter } from '../../common/filters/rcp-exception.filter';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern(LOGIN)
  async login({ email, password }: LoginDto) {
    return await this.authService.login({ email, password });
  }
}
