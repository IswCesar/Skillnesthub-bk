import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

@Schema()
export class Presale extends Document {
  @Prop({ index: true })
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  subject: string;

  @Prop()
  message: string;

  @Prop()
  type: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const PresaleSchema = SchemaFactory.createForClass(Presale);
