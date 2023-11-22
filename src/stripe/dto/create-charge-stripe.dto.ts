import { IsNumber, IsString } from 'class-validator';
export class CreateChargeStripeDto {
  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  source: string;
}
