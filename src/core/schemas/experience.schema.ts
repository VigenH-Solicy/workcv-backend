import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = HydratedDocument<Experience>;

@Schema()
export class Experience extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  start_date: string;

  @Prop({ required: false })
  end_date: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
