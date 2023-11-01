import { IsString } from 'class-validator';

export class CreatePresaleDto {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsString()
  type: string;
}
