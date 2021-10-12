import {
  ACCOUNTS_SERVICE,
  AUTH_SERVICE,
} from '@app/shared/constants/providers.const';
import { LOGIN } from '@app/shared/patterns/auth.pattern';
import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ACCOUNTS_SERVICE) private readonly accountsService: ClientProxy,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  @Post('/login')
  async login(@Body() { email, password }: LoginDto) {
    try {
      return await this.authService
        .send(LOGIN, {
          email,
        })
        .toPromise();
    } catch (err) {
      throw new HttpException({ ...err }, err.status);
    }
  }
}
