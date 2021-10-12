import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  DELETE_ACCOUNT_BY_ID,
  GET_ACCOUNT_BY_ID,
  GET_ALL_ACCOUNTS,
  REGISTER_ACCOUNT,
  UPDATE_ACCOUNT_BY_ID,
} from '@app/shared/patterns/accounts.pattern';
import { AccountsService } from './accounts.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { GetAccountByIdDto } from './dto/get-account-by-id.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';
import { DeleteAccountByIdDto } from './dto/delete-account-by-id.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(GET_ALL_ACCOUNTS)
  async getAllAccounts() {
    return await this.accountsService.getAllAccounts();
  }

  @MessagePattern(REGISTER_ACCOUNT)
  async registerAccount(@Payload() data: RegisterAccountDto) {
    return await this.accountsService.registerAccount(data);
  }

  @MessagePattern(GET_ACCOUNT_BY_ID)
  async getAccountById(@Payload() { id }: GetAccountByIdDto) {
    return await this.accountsService.getAccountById(id);
  }

  @MessagePattern(UPDATE_ACCOUNT_BY_ID)
  async updateAccountById(
    @Payload() { id, data }: { id: string; data: UpdateAccountByIdDto },
  ) {
    return await this.accountsService.updateAccountById(id, data);
  }

  @MessagePattern(DELETE_ACCOUNT_BY_ID)
  async deleteAccountById(@Payload() { id }: DeleteAccountByIdDto) {
    return await this.accountsService.deleteAccountById(id);
  }
}
