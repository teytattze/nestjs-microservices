import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAccountByIdDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
