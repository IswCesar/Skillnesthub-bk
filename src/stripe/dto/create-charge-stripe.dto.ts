import { IsNumber, IsString } from 'class-validator';
export class CreateChargeStripeDto {
  @IsNumber()
  price: number;
  description: string;
  source: string;
}
