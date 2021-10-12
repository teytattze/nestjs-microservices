import { IsString } from 'class-validator';

export class DeleteAccountByIdDto {
  @IsString()
  id: string;
}
