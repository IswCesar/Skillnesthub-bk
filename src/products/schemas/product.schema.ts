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

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
