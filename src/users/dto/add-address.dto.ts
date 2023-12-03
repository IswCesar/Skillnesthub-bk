import { IsString } from 'class-validator';

export class AddAddressDto {
  @IsString()
  address: string;

  @IsString()
  user: string;
}
