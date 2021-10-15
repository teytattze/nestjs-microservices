import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
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
import { JwtGuard } from '../../guards/jwt.guard';
import { RequestWithAccount } from '@app/shared/interfaces/request.interface';
import { firstValueFrom } from 'rxjs';

@Controller('/accounts')
export class AccountsController {
  constructor(@Inject(ACCOUNTS_SERVICE) private accountsService: ClientProxy) {}

  @Get()
  async getAllAccounts() {
    return await firstValueFrom(
      this.accountsService.send(GET_ALL_ACCOUNTS, {}),
    );
  }

  @Post('/register')
  async registerAccount(@Body() data: RegisterAccountDto) {
    return await firstValueFrom(
      this.accountsService.send(REGISTER_ACCOUNT, { ...data }),
    );
  }

  @UseGuards(JwtGuard)
  @Patch('/update')
  async updateAccountById(
    @Body() data: UpdateAccountByIdDto,
    @Req() request: RequestWithAccount,
  ) {
    return await firstValueFrom(
      this.accountsService.send(UPDATE_ACCOUNT_BY_ID, {
        id: request?.account?.id,
        data,
      }),
    );
  }

  @UseGuards(JwtGuard)
  @Delete('/delete')
  async deleteAccountById(@Req() request: RequestWithAccount) {
    return await firstValueFrom(
      this.accountsService.send(DELETE_ACCOUNT_BY_ID, {
        id: request.account.id,
      }),
    );
  }

  @Get('/:id')
  async getAccountById(@Param() { id }: GetAccountByIdDto) {
    return await firstValueFrom(
      this.accountsService.send(GET_ACCOUNT_BY_ID, { id }),
    );
  }
}
