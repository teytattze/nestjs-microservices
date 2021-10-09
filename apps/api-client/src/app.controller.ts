import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('ACCOUNTS_SERVICE') private accountsService: ClientProxy,
  ) {}

  @Get()
  getAllAccounts() {
    return this.accountsService.send('get_all_accounts', {});
  }
}
