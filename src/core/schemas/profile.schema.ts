import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  date_of_birth: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
