import { IsString } from 'class-validator';

export class GetAccountByIdDto {
  @IsString()
  id: string;
}
