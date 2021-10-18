import { IsString } from 'class-validator';

export class RefreshAccessDto {
  @IsString()
  id: string;

  @IsString()
  refreshToken: string;
}
