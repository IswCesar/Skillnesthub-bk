import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  name: string;
  @IsString()
  zipcode: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsString()
  nexterior: string;
  @IsString()
  ninterior: string;
  @IsString()
  phone: string;
  @IsString()
  streets: string;
  @IsString()
  instructions: string;
}
