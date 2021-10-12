import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async isAccountExistedByEmail(email: string) {
    return await this.accountsRepository.getAccountByEmail(email);
  }
}
