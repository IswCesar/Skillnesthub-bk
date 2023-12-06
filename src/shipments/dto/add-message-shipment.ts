import { IsString } from 'class-validator';

export class AddMessageShipmentDto {
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsString()
  shipment: string;
}
