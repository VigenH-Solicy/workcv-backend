import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type EducationDocument = HydratedDocument<Education>;

@Schema()
export class Education extends Document {
  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  start_date: string;

  @Prop({ required: false })
  end_date: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
