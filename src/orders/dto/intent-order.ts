import { IsString } from 'class-validator';
export class IntentOrderDto {
  @IsString()
  price: string;
}
