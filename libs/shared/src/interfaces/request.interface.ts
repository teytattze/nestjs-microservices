import { Request } from 'express';
import { IJwtAccount } from './jwt.interface';

export interface RequestWithAccount extends Request {
  account: IJwtAccount;
}
