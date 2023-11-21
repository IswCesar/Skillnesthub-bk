import { IsDecimal, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  shortDescription: string;

  @IsString()
  price: string;

  @IsString()
  image: string;

  @IsString()
  imageRounded: string;

  @IsString()
  imageSquare: string;

  @IsString()
  imageRect: string;

  @IsString()
  banner: string;

  @IsString()
  miniature: string;
}
