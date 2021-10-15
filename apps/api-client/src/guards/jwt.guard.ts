import { ACCESS_TOKEN_HEADER_KEY } from '@app/shared/constants/headers.const';
import { JWT_SERVICE } from '@app/shared/constants/providers.const';
import { IJwtPayload } from '@app/shared/interfaces/jwt.interface';
import { RequestWithAccount } from '@app/shared/interfaces/request.interface';
import { VERIFY_JWT } from '@app/shared/patterns/jwt.pattern';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(@Inject(JWT_SERVICE) private jwtService: ClientProxy) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: RequestWithAccount = ctx.switchToHttp().getRequest();
    const accessToken = request.headers[ACCESS_TOKEN_HEADER_KEY];

    const payload = await firstValueFrom<IJwtPayload>(
      this.jwtService.send(VERIFY_JWT, {
        jwt: accessToken,
      }),
    );

    request.account = payload.account;

    if (!payload || !payload.account) {
      return false;
    }
    return true;
  }
}
