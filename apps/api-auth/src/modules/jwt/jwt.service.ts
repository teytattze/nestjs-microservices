import { API_AUTH_CONFIG } from '@app/common/config';
import {
  JWT_MODULE_CONFIG_OPTIONS,
  PRIVATE_JWK,
  PUBLIC_JWK,
} from '@app/shared/constants/jwt.const';
import { authErrors } from '@app/shared/errors/auth.error';
import {
  IJwtAccount,
  IJwtModuleConfigOptions,
  IJwtPayload,
} from '@app/shared/interfaces/jwt.interface';
import { readFile } from '@app/shared/utils/read-file.util';
import { getExpiresTime } from '@app/shared/utils/time.util';
import { writeFile } from '@app/shared/utils/write-file.util';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { fromKeyLike } from 'jose/jwk/from_key_like';
import { parseJwk } from 'jose/jwk/parse';
import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';
import { decodeProtectedHeader } from 'jose/util/decode_protected_header';
import { generateKeyPair } from 'jose/util/generate_key_pair';

@Injectable()
export class JwtService {
  private jwks: Record<string, any>;
  private alg: 'RS256';
  private ttl: number;
  private jwksFilepath: string;

  constructor(
    @Inject(JWT_MODULE_CONFIG_OPTIONS) options: IJwtModuleConfigOptions,
    private readonly configService: ConfigService,
  ) {
    const jwtConfig = this.configService.get(`${API_AUTH_CONFIG}.jwt`);

    this.alg = jwtConfig.alg;
    this.ttl = jwtConfig.ttl;
    this.jwksFilepath = options.jwkFilepath;

    this.loadJwks();
  }

  async generateJwt(payload: IJwtAccount) {
    const expires = getExpiresTime(this.ttl);
    const kid = Math.floor(Math.random() * 10 + 1).toString();

    const privateJwk = this.jwks[kid][PRIVATE_JWK];
    const privateKey = await parseJwk({ ...privateJwk, alg: this.alg });

    const jwtToken = await new SignJWT({ account: payload })
      .setProtectedHeader({ alg: this.alg, kid })
      .setExpirationTime(expires)
      .sign(privateKey);

    return jwtToken;
  }

  async verifyJwt(token: string): Promise<IJwtPayload> {
    try {
      const { alg, kid } = await decodeProtectedHeader(token);

      const publicJwk = this.jwks[kid][PUBLIC_JWK];
      const publicKey = await parseJwk({ ...publicJwk, alg });

      const { payload } = await jwtVerify(token, publicKey);

      return payload as IJwtPayload;
    } catch (err) {
      throw new RpcException(authErrors.accessTokenInvalid);
    }
  }

  async refreshJwks() {
    const { publicKey, privateKey } = await generateKeyPair(this.alg);

    const publicJwk = await fromKeyLike(publicKey);
    const privateJwk = await fromKeyLike(privateKey);

    const jwks = {};
    for (let i = 1; i <= 10; i++) {
      jwks[i] = { publicJwk, privateJwk };
    }

    const jwksString = JSON.stringify(jwks);
    const writeSuccess = writeFile(jwksString, this.jwksFilepath);

    if (writeSuccess) {
      this.loadJwks();
      return { message: 'Key pair rotation successfully' };
    }
    return { message: 'Key pair rotation failed' };
  }

  private loadJwks() {
    const jwks = readFile(this.jwksFilepath);
    if (!jwks) {
      this.refreshJwks();
      return;
    }
    this.jwks = JSON.parse(jwks);
  }
}
