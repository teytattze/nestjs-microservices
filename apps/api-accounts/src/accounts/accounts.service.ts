import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { RegisterAccountDto } from './dto/register-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async getAllAccounts() {
    return await this.accountsRepository.getAllAccounts();
  }

  async registerAccount(data: RegisterAccountDto) {
    return await this.accountsRepository.createAccount(data);
  }

  async getAccountById(id: string) {
    return await this.accountsRepository.getAccountById(id);
  }
}
