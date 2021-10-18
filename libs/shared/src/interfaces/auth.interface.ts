import { Account } from '.prisma/client';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  account: Account;
}

export interface IRefreshAccessResponse {
  accessToken: string;
}
