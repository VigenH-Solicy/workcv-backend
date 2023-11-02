import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  name: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
