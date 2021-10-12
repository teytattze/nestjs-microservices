import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  async login({ email, password }: LoginDto) {
    const account = await this.accountsService.isAccountExistedByEmail(email);
    if (!account) {
      throw new RpcException({ status: 400, message: 'Unauthorized' });
    }
    return account;
  }
}
