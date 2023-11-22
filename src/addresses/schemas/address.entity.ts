import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ index: true })
  name: string;

  @Prop()
  zipcode: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  nexterior: string;

  @Prop()
  ninterior: string;

  @Prop()
  phone: string;

  @Prop()
  streets: string;

  @Prop()
  instructions: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
