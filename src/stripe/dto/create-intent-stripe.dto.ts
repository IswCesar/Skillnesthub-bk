import { IsNumber, IsString } from 'class-validator';
export class CreateStripeIntentDto {
  @IsNumber()
  price: number;
}
