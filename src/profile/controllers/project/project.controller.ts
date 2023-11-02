import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpMessageEnum } from 'src/core/enums/http-messages.enum';
import { responseSender } from 'src/core/helpers/respons-sender';
import { valueTrimmer } from 'src/core/helpers/valueTrimmer';
import { IProject } from 'src/core/interfaces/project.interface';
import { ProjectService } from 'src/profile/services/project/project.service';

@Controller('project')
export class ProjectController {
  private readonly title: string = 'Project';
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public async setProject(@Body() project: IProject): Promise<object> {
    try {
      project = valueTrimmer(project);
      await this.projectService.setProject(project);
      return responseSender(
        this.title + HttpMessageEnum.CREATED,
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':_id')
  public async updateProject(
    @Param() id: string,
    @Body() project: IProject,
  ): Promise<object> {
    project = valueTrimmer(project);
    try {
      const response = await this.projectService.updateProject(id, project);
      if (response) {
        return responseSender(
          this.title + HttpMessageEnum.UPDATED,
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          this.title + HttpMessageEnum.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':_id')
  public async deleteProject(@Param() id: string): Promise<object> {
    try {
      const response = await this.projectService.deleteProject(id);
      if (response) {
        return responseSender(
          this.title + HttpMessageEnum.REMOVED,
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          this.title + HttpMessageEnum.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
