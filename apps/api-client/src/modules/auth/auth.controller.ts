import { API_AUTH_CONFIG } from '@app/common/config';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  ACCOUNT_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from '@app/shared/constants/cookies.const';
import { AUTH_SERVICE } from '@app/shared/constants/providers.const';
import { IAccount } from '@app/shared/interfaces/accounts.interface';
import {
  ILoginResponse,
  IRefreshAccessResponse,
} from '@app/shared/interfaces/auth.interface';
import { LOGIN, REFRESH_ACCESS } from '@app/shared/patterns/auth.pattern';
import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private jwtTtl: number;
  private sessionTtl: number;

  constructor(
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
    const result = (await firstValueFrom(
      this.authService.send(LOGIN, {
        email,
        password,
      }),
    )) as ILoginResponse;

    response.cookie(ACCESS_TOKEN_COOKIE_KEY, result.accessToken, {
      maxAge: this.jwtTtl * 1000,
    });
    response.cookie(REFRESH_TOKEN_COOKIE_KEY, result.refreshToken, {
      maxAge: this.sessionTtl * 1000,
      httpOnly: true,
    });
    response.cookie(ACCOUNT_COOKIE_KEY, result.account, {
      maxAge: this.sessionTtl * 1000,
      httpOnly: true,
    });

    return { message: 'Login successfully' };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    response.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    return { message: 'Logout successfully' };
  }

  @Get('/refresh-access')
  async refreshAccess(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_KEY];
    const account = request.cookies[ACCOUNT_COOKIE_KEY] as IAccount;

    const result = (await firstValueFrom(
      this.authService.send(REFRESH_ACCESS, {
        id: account.id,
        refreshToken,
      }),
    )) as IRefreshAccessResponse;

    response.cookie(ACCESS_TOKEN_COOKIE_KEY, result.accessToken, {
      maxAge: this.jwtTtl * 1000,
    });

    return { message: 'Refresh access successfully' };
  }
}
