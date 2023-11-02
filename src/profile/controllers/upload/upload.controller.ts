import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Delete,
  HttpStatus,
  Param,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { HttpMessageEnum } from 'src/core/enums/http-messages.enum';
import { responseSender } from 'src/core/helpers/respons-sender';
import { UploadService } from 'src/profile/services/upload/upload.service';

@Controller('upload')
export class UploadController {
  private readonly uploadDir: string = path.join(process.cwd(), 'uploads');
  private readonly title: string = 'File';
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) {
      return responseSender(
        this.title + HttpMessageEnum.NOT_UPLOADED,
        HttpStatus.GONE,
      );
    }
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
    file.originalname = file.originalname.split(' ').join('_');
    const fileName = `${Date.now() + file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);
    await this.uploadService.saveImage(fileName);
    fs.writeFileSync(filePath, file.buffer);
    return responseSender(
      this.title + HttpMessageEnum.UPLOADED,
      HttpStatus.CREATED,
      fileName,
    );
  }

  @Delete(':name')
  public async removeImage(@Param() name: string): Promise<object> {
    try {
      const response = await this.uploadService.removeImage(name);
      if (!response) {
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
}
