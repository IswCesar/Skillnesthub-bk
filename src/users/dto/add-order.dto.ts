import { IsString } from 'class-validator';

export class AddOrderDto {
  @IsString()
  order: string;

  @IsString()
  user: string;
}
