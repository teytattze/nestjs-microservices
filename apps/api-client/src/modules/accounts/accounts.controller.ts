import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE } from '@app/shared/constants/providers.const';
import {
  DELETE_ACCOUNT_BY_ID,
  GET_ACCOUNT_BY_ID,
  GET_ALL_ACCOUNTS,
  REGISTER_ACCOUNT,
  UPDATE_ACCOUNT_BY_ID,
} from '@app/shared/patterns/accounts.pattern';
import { RegisterAccountDto } from './dto/register-account.dto';
import { GetAccountByIdDto } from './dto/get-account-by-id.dto';
import { UpdateAccountByIdDto } from './dto/update-account-by-id.dto';
import { DeleteAccountByIdDto } from './dto/delete-account-by-id.dto';

@Controller('/accounts')
export class AccountsController {
  constructor(@Inject(ACCOUNTS_SERVICE) private accountsService: ClientProxy) {}

  @Get()
  getAllAccounts() {
    return this.accountsService.send(GET_ALL_ACCOUNTS, {});
  }

  @Post()
  registerAccount(@Body() data: RegisterAccountDto) {
    return this.accountsService.send(REGISTER_ACCOUNT, { ...data });
  }

  @Get('/:id')
  getAccountById(@Param() { id }: GetAccountByIdDto) {
    return this.accountsService.send(GET_ACCOUNT_BY_ID, { id });
  }

  @Patch('/:id')
  updateAccountById(
    @Body() data: UpdateAccountByIdDto,
    @Param() { id }: { id: string },
  ) {
    return this.accountsService.send(UPDATE_ACCOUNT_BY_ID, { id, data });
  }

  @Delete('/:id')
  deleteAccountById(@Param() { id }: DeleteAccountByIdDto) {
    return this.accountsService.send(DELETE_ACCOUNT_BY_ID, { id });
  }
}
