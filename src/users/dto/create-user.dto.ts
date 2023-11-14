import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  birthday: string;
}
