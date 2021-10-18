import { deleteObjectField } from '@app/shared/utils/objects.util';
import { compareHashedString } from '@app/shared/utils/crypto.util';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '../jwt/jwt.service';
import { SessionsService } from '../sessions/sessions.service';
import { RefreshAccessDto } from './dto/refresh-access.dto';
import { authErrors } from '@app/shared/errors/auth.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
  ) {}

  async login({ email, password }: LoginDto) {
    const account = await this.accountsService.getAccountByEmail(email);

    const isPasswordMatched = await compareHashedString(
      password,
      account.password,
    );
    if (!isPasswordMatched) {
      throw new RpcException(authErrors.wrongCredentials);
    }

    const accessToken = await this.jwtService.generateJwt({
      id: account.id,
      email: account.email,
    });

    const refreshToken = await this.sessionsService.updateAccountSessionById(
      account.session.id,
    );

    deleteObjectField(account, 'password');
    deleteObjectField(account, 'session');

    return {
      accessToken,
      refreshToken,
      account,
    };
  }

  async refreshAccess(data: RefreshAccessDto) {
    const { id, refreshToken } = data;
    const account = await this.accountsService.getAccountById(id);

    await this.sessionsService.verifySession(account.session.id, refreshToken);

    const accessToken = await this.jwtService.generateJwt({
      id: account.id,
      email: account.email,
    });

    return {
      accessToken,
    };
  }
}
