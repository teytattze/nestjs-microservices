import { API_AUTH_CONFIG } from '@app/common/config';
import { authErrors } from '@app/shared/errors/auth.error';
import { createRandomBytes } from '@app/shared/utils/crypto.util';
import { createExpiredDate, isExpired } from '@app/shared/utils/time.util';
import { Injectable } from '@nestjs/common';
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
    const currentSession = await this.getSessionById(id);

    if (
      currentSession.token !== null &&
      currentSession.expires !== null &&
      !isExpired(currentSession.expires)
    ) {
      return currentSession.token;
    }

    const session = this.generateSession();
    const { token } = await this.sessionsRepository.updateSessionById(
      id,
      session,
    );

    return token;
  }

  async invalidateAccountSessionById(id: string) {
    await this.getSessionById(id);
    await this.sessionsRepository.updateSessionById(id, {
      token: null,
      expires: null,
    });
  }

  async verifySession(id: string, refreshToken: string) {
    const session = await this.getSessionById(id);

    if (!session.token || !session.expires) {
      throw new RpcException(authErrors.sessionInvalid);
    }
    if (isExpired(session.expires)) {
      throw new RpcException(authErrors.refreshTokenExpired);
    }
    if (refreshToken !== session.token) {
      throw new RpcException(authErrors.refreshTokenInvalid);
    }

    return session;
  }

  async getSessionById(id: string) {
    const currentSession = await this.sessionsRepository.getSessionById(id);
    if (!currentSession) {
      throw new RpcException(authErrors.sessionNotFounded);
    }
    return currentSession;
  }

  private generateSession() {
    const token = createRandomBytes(this.bytes);
    const expires = createExpiredDate(this.ttl);
    return { token, expires };
  }
}
