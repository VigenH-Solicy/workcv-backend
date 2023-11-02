import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';
import { LanguageEnum } from '../enums/language.enum';

export type LanguageDocument = HydratedDocument<Language>;

@Schema()
export class Language extends Document {
  @Prop({ required: true })
  language: string;

  @Prop({ required: false, enum: LanguageEnum, default: LanguageEnum.LEARNER })
  level: LanguageEnum;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
