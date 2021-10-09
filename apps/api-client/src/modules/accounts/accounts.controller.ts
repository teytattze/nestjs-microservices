import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ACCOUNTS_SERVICE,
  DELETE_ACCOUNT_BY_ID,
  GET_ACCOUNT_BY_ID,
  GET_ALL_ACCOUNTS,
  REGISTER_ACCOUNT,
  UPDATE_ACCOUNT_BY_ID,
} from '@app/shared/constants';
import { RegisterAccountDto } from './dto/register-account.dto';

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
  getAccountById() {
    return this.accountsService.send(GET_ACCOUNT_BY_ID, {});
  }

  @Patch('/:id')
  updateAccountById() {
    return this.accountsService.send(UPDATE_ACCOUNT_BY_ID, {});
  }

  @Delete('/:id')
  deleteAccountById() {
    return this.accountsService.send(DELETE_ACCOUNT_BY_ID, {});
  }
}
