import {
  Body,
  Controller,
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
import { IProfile } from 'src/core/interfaces/profile.interface';
import { Profile } from 'src/core/schemas/profile.schema';
import { ProfileService } from 'src/profile/services/profile/profile.service';

@Controller('profile')
export class ProfileController {
  private readonly title: string = 'Profile';
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  public getProfile(): Promise<Profile | null> {
    return this.profileService.getProfile();
  }

  @Post()
  public async saveProfile(@Body() profile: IProfile): Promise<object | Error> {
    profile = valueTrimmer(profile);
    try {
      await this.profileService.setProfile(profile);
      return responseSender(
        this.title + HttpMessageEnum.CREATED,
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':_id')
  public async updateProfile(
    @Param() _id: string,
    @Body() body: IProfile,
  ): Promise<object | Error> {
    body = valueTrimmer(body);
    try {
      const response = await this.profileService.updateProfile(_id, body);
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
}
