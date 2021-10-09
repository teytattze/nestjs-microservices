import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IAccount } from './accounts.interface';

@Controller()
export class AccountsController {
  private accounts: IAccount[] = [
    {
      id: 1,
      email: 'liam@gmail.com',
      password: '123',
    },
    {
      id: 2,
      email: 'tey@gmail.com',
      password: '1234',
    },
    {
      id: 3,
      email: 'livia@gmail.com',
      password: '12345',
    },
  ];

  @MessagePattern('get_all_accounts')
  getAllAccounts(data: string) {
    console.log(data);
    return this.accounts;
  }
}
