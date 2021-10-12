import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { AccountsRepository } from './accounts.repository';
import { RegisterAccountDto } from './dto/register-account.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async getAllAccounts() {
    return await this.accountsRepository.getAllAccounts();
  }

  async registerAccount({ email, password }: RegisterAccountDto) {
    const account = await this.accountsRepository.getAccountByEmail(email);
    if (account) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'This email has already taken',
      });
    }
    const hashedPassword = await this.hashString(password);
    return await this.accountsRepository.createAccount({
      email,
      password: hashedPassword,
    });
  }

  async getAccountById(id: string) {
    const result = await this.accountsRepository.getAccountById(id);
    if (!result) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Account not found',
      });
    }
    return result;
  }

  async updateAccountById(id: string, data: UpdateAccountByIdDto) {
    return await this.accountsRepository.updateAccountById(id, data);
  }

  async deleteAccountById(id: string) {
    return await this.accountsRepository.deleteAccountById(id);
  }

  private async hashString(value: string) {
    const hashedValue = await bcrypt.hash(value, SALT_ROUNDS);
    return hashedValue;
  }
}
