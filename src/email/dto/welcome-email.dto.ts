import { IsString } from 'class-validator';
export class WelcomeEmailDto {
  @IsString()
  email: string;
  @IsString()
  name: string;
}
