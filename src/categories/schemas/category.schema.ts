import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ index: true })
  name: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop()
  product: [
    {
      type: Types.ObjectId;
      ref: 'Product';
    },
  ];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
