import { API_AUTH_CONFIG } from '@app/common/config';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from '@app/shared/constants/cookies.const';
import {
  ACCOUNTS_SERVICE,
  AUTH_SERVICE,
} from '@app/shared/constants/providers.const';
import { ILoginResponse } from '@app/shared/interfaces/auth.interface';
import { LOGIN } from '@app/shared/patterns/auth.pattern';
import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private jwtTtl: number;
  private sessionTtl: number;

  constructor(
    @Inject(ACCOUNTS_SERVICE) private readonly accountsService: ClientProxy,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    this.jwtTtl = this.configService.get(`${API_AUTH_CONFIG}.jwt.ttl`);
    this.sessionTtl = this.configService.get(`${API_AUTH_CONFIG}.session.ttl`);
  }

  @Post('/login')
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const result = (await this.authService
        .send(LOGIN, {
          email,
          password,
        })
        .toPromise()) as ILoginResponse;

      response.cookie(ACCESS_TOKEN_COOKIE_KEY, result.accessToken, {
        maxAge: this.jwtTtl * 1000,
      });
      response.cookie(REFRESH_TOKEN_COOKIE_KEY, result.refreshToken, {
        maxAge: this.sessionTtl * 1000,
        httpOnly: true,
      });

      return { account: result.account };
    } catch (err) {
      throw new HttpException({ ...err }, err.statusCode);
    }
  }

  @Post('/logout')
  async logout() {
    return;
  }
}
