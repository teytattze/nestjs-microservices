import { authErrors } from '@app/shared/errors/auth.error';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async getAccountByEmail(email: string) {
    const account = await this.accountsRepository.getAccountByEmail(email);
    if (!account) {
      throw new RpcException(authErrors.wrongCredentials);
    }
    return account;
  }

  async getAccountById(id: string) {
    const account = await this.accountsRepository.getAccountById(id);
    if (!account) {
      throw new RpcException(authErrors.wrongCredentials);
    }
    return account;
  }
}
