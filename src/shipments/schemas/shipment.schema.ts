import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types, Document } from 'mongoose';

@Schema()
export class Shipment extends Document {
  @Prop()
  folio: string;

  @Prop()
  status: string;

  @Prop()
  sender: string;

  @Prop()
  receiver: string;

  @Prop()
  messages: [string];

  @Prop()
  deadline: string;

  @Prop({ type: Types.ObjectId })
  address: {
    type: Types.ObjectId;
    ref: 'Address';
  };

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
