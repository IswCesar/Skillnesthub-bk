import { IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  receiver: string;
  @IsString()
  address: string;
}
