import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HttpMessageEnum } from 'src/core/enums/http-messages.enum';
import { responseSender } from 'src/core/helpers/respons-sender';
import { valueTrimmer } from 'src/core/helpers/valueTrimmer';
import { IExperience } from 'src/core/interfaces/experience.interface';
import { ExperienceService } from 'src/profile/services/experience/experience.service';

@Controller('experience')
export class ExperienceController {
  private readonly title: string = 'Experience';
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  public async getAllExperiences(): Promise<any> {
    return this.experienceService.getAllExperiences();
  }

  @Post()
  public async setExperience(@Body() experience: IExperience): Promise<object> {
    experience = valueTrimmer(experience);
    try {
      await this.experienceService.saveExperience(experience);
      return responseSender(
        this.title + HttpMessageEnum.CREATED,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return responseSender(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':_id')
  public async updateExperience(
    @Param() id: string,
    @Body() experience: IExperience,
  ): Promise<object> {
    experience = valueTrimmer(experience);
    try {
      const response = await this.experienceService.updateExperience(
        id,
        experience,
      );
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':_id')
  public async deleteExperience(@Param() id: string): Promise<object> {
    try {
      const response = await this.experienceService.deleteExperience(id);
      if (response) {
        return responseSender(
          this.title + HttpMessageEnum.REMOVED,
          HttpStatus.OK,
        );
      } else {
        return responseSender(
          this.title + HttpMessageEnum.NOT_FOUND,
          HttpStatus.OK,
        );
      }
    } catch (error) {
      return responseSender(error.message, HttpStatus.OK);
    }
  }
}
