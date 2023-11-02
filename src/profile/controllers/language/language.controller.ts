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
import { ILanguage } from 'src/core/interfaces/language.interface';
import { Language } from 'src/core/schemas/language.schema';
import { LanguageService } from 'src/profile/services/language/language.service';

@Controller('language')
export class LanguageController {
  private readonly title = 'Language';

  constructor(private readonly languageService: LanguageService) {}

  @Get()
  public async getLanguages(): Promise<Language[]> {
    try {
      const response = await this.languageService.getLanguages();
      if (!response) {
        throw new HttpException(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':_id')
  public async updateLanguage(
    @Param() id: string,
    @Body() language: ILanguage,
  ): Promise<object> {
    language = valueTrimmer(language);
    try {
      const response = await this.languageService.updateLanguage(id, language);
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

  @Post()
  public async setLanguage(@Body() language: ILanguage): Promise<object> {
    language = valueTrimmer(language);
    try {
      const response = await this.languageService.setLanguage(language);
      if (!response) {
        throw new HttpException(
          HttpMessageEnum.SOMETHING_WENT_WRONG,
          HttpStatus.BAD_REQUEST,
        );
      }
      return responseSender(
        this.title + HttpMessageEnum.CREATED,
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':_id')
  public async removeLanguage(@Param() id: string): Promise<object> {
    try {
      const response = await this.languageService.removeLanguage(id);
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
