import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types, Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop({ index: true })
  firstname: string;

  @Prop({ index: true })
  lastname: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 'client' })
  type: string;

  @Prop()
  birthday: string;

  @Prop({ default: '' })
  otp: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop({ default: now() })
  lastLogin: Date;

  @Prop({ type: [Types.ObjectId] })
  orders: [
    {
      type: Types.ObjectId;
      ref: 'Order';
    },
  ];

  @Prop({ type: [Types.ObjectId] })
  addresses: [
    {
      type: Types.ObjectId;
      ref: 'Address';
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
