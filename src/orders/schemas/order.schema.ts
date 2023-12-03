import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId })
  product: {
    type: Types.ObjectId;
    ref: 'Product';
  };

  @Prop({ type: Types.ObjectId })
  user: {
    type: Types.ObjectId;
    ref: 'User';
  };

  @Prop()
  folio: string;

  @Prop()
  mode: string;

  @Prop()
  paymentMode: string;

  @Prop()
  ref: string;

  @Prop()
  total: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
