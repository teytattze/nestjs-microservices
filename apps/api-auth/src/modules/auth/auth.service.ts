import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AccountsService } from '../accounts/accounts.service';
import { compareHashedString } from '../../lib/crypto.lib';
import { JwtService } from '../jwt/jwt.service';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
  ) {}

  async login({ email, password }: LoginDto) {
    const account = await this.accountsService.isAccountExistedByEmail(email);
    if (!account) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    const isPasswordMatched = await compareHashedString(
      password,
      account.password,
    );
    if (!isPasswordMatched) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    const accessToken = await this.jwtService.generateJwtToken({
      id: account.id,
      email: account.email,
    });

    const refreshToken = await this.sessionsService.updateAccountSessionById(
      account.session.id,
    );

    return {
      accessToken,
      refreshToken,
      account: { ...account, password: null },
    };
  }
}
