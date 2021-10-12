import { JWTPayload } from 'jose/types';

export interface IJwtModuleConfigOptions {
  jwkFilepath: string;
}

export interface IJwtAccount {
  id: string;
  email: string;
}

export interface IJwtPayload extends JWTPayload {
  user: IJwtAccount;
}
