import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GET_ACCOUNT_BY_ID,
  GET_ALL_ACCOUNTS,
  REGISTER_ACCOUNT,
} from '@app/shared/constants';
import { AccountsService } from './accounts.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { GetAccountByIdDto } from './dto/get-account-by-id.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(GET_ALL_ACCOUNTS)
  async getAllAccounts() {
    return await this.accountsService.getAllAccounts();
  }

  @MessagePattern(REGISTER_ACCOUNT)
  async registerAccount(data: RegisterAccountDto) {
    return await this.accountsService.registerAccount(data);
  }

  @MessagePattern(GET_ACCOUNT_BY_ID)
  async getAccountById(data: GetAccountByIdDto) {
    return await this.accountsService.getAccountById(data.id);
  }
}
