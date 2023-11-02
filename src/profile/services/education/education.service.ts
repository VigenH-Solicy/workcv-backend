import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEducation } from 'src/core/interfaces/education.interface';
import { Education } from 'src/core/schemas/education.schema';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name)
    private readonly educationModel: Model<Education>,
  ) {}

  public async setEducation(education: IEducation): Promise<Education> {
    const newEducation = await new this.educationModel(education);
    return await newEducation.save();
  }

  public async getEducations(): Promise<Education[]> {
    return await this.educationModel.find();
  }

  public async updateEducation(
    id: string,
    education: IEducation,
  ): Promise<Education> {
    return await this.educationModel.findByIdAndUpdate(id, education);
  }

  public async removeEducation(id: string): Promise<Education> {
    return await this.educationModel.findByIdAndRemove(id);
  }
}
