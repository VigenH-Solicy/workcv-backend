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
import { ISkill } from 'src/core/interfaces/skill.interface';
import { Skill } from 'src/core/schemas/skill.schema';
import { SkillService } from 'src/profile/services/skill/skill.service';

@Controller('skill')
export class SkillController {
  private readonly title: string = 'Skill';
  constructor(private readonly skillService: SkillService) {}

  @Get()
  public async getSkills(): Promise<Skill[] | object> {
    try {
      const skills = await this.skillService.getSkills();
      if (!skills) {
        return responseSender(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return skills;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }

  @Post()
  public async setSkill(@Body() skill: ISkill): Promise<object> {
    skill = valueTrimmer(skill);
    try {
      const newSkill = await this.skillService.setSkill(skill);
      if (!newSkill) {
        return responseSender(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return responseSender(
        this.title + HttpMessageEnum.CREATED,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':_id')
  public async removeSkill(@Param() id: string): Promise<object> {
    try {
      const skillResponse = await this.skillService.removeSkill(id);
      if (!skillResponse) {
        return responseSender(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return responseSender(
        this.title + HttpMessageEnum.REMOVED,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':_id')
  public async updateSkill(
    @Param() id: string,
    @Body() skill: ISkill,
  ): Promise<object> {
    skill = valueTrimmer(skill);
    try {
      const skillResponse = await this.skillService.updateSkill(id, skill);
      if (!skillResponse) {
        return responseSender(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return responseSender(
        this.title + HttpMessageEnum.UPDATED,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
