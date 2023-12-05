import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, Types } from 'mongoose';
// BASE PARA POPULATE

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: { type: Types.ObjectId; ref: 'Product' };

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  user: { type: Types.ObjectId; ref: 'User' };

  @Prop({ type: Types.ObjectId, ref: 'Shipment' })
  shipment: { type: Types.ObjectId; ref: 'Shipment' };

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
