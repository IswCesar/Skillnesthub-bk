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
  description_eng: string;

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

  @IsString()
  type: string;

  @IsString()
  release: string;

  @IsString()
  players: string;

  @IsString()
  genre: string;

  @IsString()
  publisher: string;

  @IsString()
  esrb: string;

  @IsString()
  supported: string;

  @IsString()
  size: string;

  @IsString()
  lang: string;
}
