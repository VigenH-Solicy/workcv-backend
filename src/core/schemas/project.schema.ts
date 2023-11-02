import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  team_size: number;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  responsibilities: string[];

  @Prop({ required: true })
  technologies: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
