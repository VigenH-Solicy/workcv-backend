import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from 'src/core/interfaces/project.interface';
import { Project } from 'src/core/schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  public async setProject(project: IProject): Promise<Project | null> {
    const newProject = new this.projectModel(project);
    return await newProject.save();
  }

  public async updateProject(
    id: string,
    project: IProject,
  ): Promise<IProject | null> {
    return await this.projectModel.findByIdAndUpdate(id, project);
  }

  public async getProjects(): Promise<Project[]> {
    return await this.projectModel.find();
  }

  public async deleteProject(id: string): Promise<any> {
    return await this.projectModel.findByIdAndDelete(id);
  }
}
