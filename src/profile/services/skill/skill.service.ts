import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISkill } from 'src/core/interfaces/skill.interface';
import { Skill } from 'src/core/schemas/skill.schema';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  public async setSkill(skill: ISkill): Promise<Skill> {
    const newSkill = new this.skillModel(skill);
    return await newSkill.save();
  }

  public async removeSkill(id: string): Promise<Skill> {
    return await this.skillModel.findByIdAndDelete(id);
  }

  public async updateSkill(id: string, skill: ISkill): Promise<Skill> {
    return await this.skillModel.findByIdAndUpdate(id, skill);
  }

  public async getSkills(): Promise<Skill[]> {
    return this.skillModel.find();
  }
}
