import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';

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

  async updateAccountById(id: string, data: UpdateAccountByIdDto) {
    return await this.accountsRepository.updateAccountById(id, data);
  }

  async deleteAccountById(id: string) {
    return await this.accountsRepository.deleteAccountById(id);
  }
}
