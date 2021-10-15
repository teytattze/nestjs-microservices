import { accountErrors } from '@app/shared/errors/accounts.error';
import { defaultErrors } from '@app/shared/errors/default.error';
import { IAccount } from '@app/shared/interfaces/accounts.interface';
import { createHashString } from '@app/shared/utils/crypto.util';
import { deleteObjectField } from '@app/shared/utils/objects.util';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AccountsRepository } from './accounts.repository';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async getAllAccounts() {
    const result = await this.accountsRepository.getAllAccounts();
    return deleteObjectField<IAccount>(result, 'password');
  }

  async registerAccount({ email, password }: RegisterAccountDto) {
    const account = await this.accountsRepository.getAccountByEmail(email);
    if (account) {
      throw new RpcException(accountErrors.duplicatedEmail);
    }
    const hashedPassword = await createHashString(password, SALT_ROUNDS);
    const result = await this.accountsRepository.createAccount({
      email,
      password: hashedPassword,
    });
    return deleteObjectField<IAccount>(result, 'password');
  }

  async getAccountById(id: string) {
    const result = await this.accountsRepository.getAccountByEmail(id);
    if (!result) {
      throw new RpcException(accountErrors.accountNotFounded);
    }
    return deleteObjectField<IAccount>(result, 'password');
  }

  async updateAccountById(id: string, data: UpdateAccountByIdDto) {
    const result = await this.accountsRepository.updateAccountById(id, data);
    if (!result) {
      throw new RpcException(defaultErrors.BAD_REQUEST);
    }
    return deleteObjectField<IAccount>(result, 'password');
  }

  async deleteAccountById(id: string) {
    const result = await this.accountsRepository.deleteAccountById(id);
    if (!result) {
      throw new RpcException(defaultErrors.BAD_REQUEST);
    }
    return deleteObjectField<IAccount>(result, 'password');
  }
}
