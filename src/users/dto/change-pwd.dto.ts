import { IsString } from 'class-validator';

export class ChangePwdDto {
  @IsString()
  password: string;

  @IsString()
  user: string;
}
