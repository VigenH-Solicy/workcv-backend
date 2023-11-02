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
import { IEducation } from 'src/core/interfaces/education.interface';
import { Education } from 'src/core/schemas/education.schema';
import { EducationService } from 'src/profile/services/education/education.service';

@Controller('education')
export class EducationController {
  private readonly title: string = 'Education';
  constructor(private readonly educationService: EducationService) {}

  @Get()
  public async getEducations(): Promise<Education[]> {
    return this.educationService.getEducations();
  }

  @Post()
  public async setEducation(@Body() education: IEducation): Promise<object> {
    education = valueTrimmer(education);
    try {
      const response = await this.educationService.setEducation(education);
      if (!response) {
        throw new HttpException(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return responseSender(
        `${this.title + HttpMessageEnum.CREATED}`,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':_id')
  public async updateEducation(
    @Param() id: string,
    @Body() education: IEducation,
  ): Promise<object> {
    try {
      const response = await this.educationService.updateEducation(
        id,
        education,
      );
      if (!response) {
        throw new HttpException(
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

  @Delete(':_id')
  public async removeEducation(@Param() id: string): Promise<object> {
    try {
      const response = await this.educationService.removeEducation(id);
      if (!response) {
        throw new HttpException(
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
}
