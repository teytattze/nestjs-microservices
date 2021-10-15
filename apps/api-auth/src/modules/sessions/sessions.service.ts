import { API_AUTH_CONFIG } from '@app/common/config';
import { createRandomBytes } from '@app/shared/utils/crypto.util';
import { createExpiredDate, isExpired } from '@app/shared/utils/time.util';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  private bytes: number;
  private ttl: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly sessionsRepository: SessionsRepository,
  ) {
    const sessionConfig = this.configService.get(`${API_AUTH_CONFIG}.session`);

    this.bytes = sessionConfig.bytes;
    this.ttl = sessionConfig.ttl;
  }

  async updateAccountSessionById(id: string) {
    const currentSession = await this.isSessionExistedById(id);

    if (
      currentSession.token !== null &&
      currentSession.expires !== null &&
      !isExpired(currentSession.expires)
    ) {
      return currentSession;
    }

    const session = this.generateSession();
    const { token } = await this.sessionsRepository.updateSessionById(
      id,
      session,
    );

    return token;
  }

  async invalidateAccountSessionById(id: string) {
    await this.isSessionExistedById(id);
    await this.sessionsRepository.updateSessionById(id, {
      token: null,
      expires: null,
    });
  }

  async isSessionExistedById(id: string) {
    const currentSession = await this.sessionsRepository.getSessionById(id);
    if (!currentSession) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    return currentSession;
  }

  private generateSession() {
    const token = createRandomBytes(this.bytes);
    const expires = createExpiredDate(this.ttl);
    return { token, expires };
  }
}
