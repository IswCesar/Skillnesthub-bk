import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ unique: true, index: true })
  sku: string;

  @Prop({ index: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  description_eng: string;

  @Prop()
  shortDescription: string;

  @Prop()
  price: string;

  @Prop()
  image: string;

  @Prop()
  imageRounded: string;

  @Prop()
  imageSquare: string;

  @Prop()
  imageRect: string;

  @Prop()
  banner: string;

  @Prop()
  miniature: string;

  @Prop()
  category: [
    {
      type: Types.ObjectId;
      ref: 'Category';
    },
  ];

  @Prop()
  order: [
    {
      type: Types.ObjectId;
      ref: 'Order';
    },
  ];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop()
  type: string;

  @Prop()
  release: string;

  @Prop()
  players: string;

  @Prop()
  genre: string;

  @Prop()
  publisher: string;

  @Prop()
  esrb: string;

  @Prop()
  supported: string;

  @Prop()
  size: string;

  @Prop()
  lang: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
