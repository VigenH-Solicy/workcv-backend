import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema()
export class Skill extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  percent: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
