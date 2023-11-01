import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop({ index: true })
  firstname: string;

  @Prop({ index: true })
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  birthday: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop({ default: now() })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
