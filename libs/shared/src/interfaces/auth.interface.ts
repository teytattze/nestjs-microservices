import { Account } from '.prisma/client';

export interface ILoginResponse {
  accessToken: string;
  account: Account;
}
