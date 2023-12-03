import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  total: string;
  @IsString()
  mode: string;
  @IsString()
  paymentMode: string;
  @IsString()
  ref: string;
  @IsString()
  folio: string;
  @IsString()
  createdAt: string;
}
