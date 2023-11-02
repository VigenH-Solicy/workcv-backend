import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExperience } from 'src/core/interfaces/experience.interface';
import { Experience } from 'src/core/schemas/experience.schema';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceModel: Model<Experience>,
  ) {}

  public async saveExperience(experience: IExperience): Promise<Experience> {
    const newExperience = new this.experienceModel(experience);
    return await newExperience.save();
  }

  public async updateExperience(
    id: string,
    experience: IExperience,
  ): Promise<Experience> {
    return await this.experienceModel.findByIdAndUpdate(id, experience);
  }

  public async getAllExperiences(): Promise<Experience[]> {
    return await this.experienceModel.find();
  }

  public async deleteExperience(id: string): Promise<Experience> {
    return await this.experienceModel.findByIdAndDelete(id);
  }
}
