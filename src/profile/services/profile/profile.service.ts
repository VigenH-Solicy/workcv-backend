import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfile } from 'src/core/interfaces/profile.interface';
import { Profile } from 'src/core/schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  public async getProfile(): Promise<Profile | null> {
    return await this.profileModel.findOne();
  }

  public async setProfile(profile: IProfile): Promise<Profile | null> {
    const profileToSave = new this.profileModel(profile);
    return await profileToSave.save();
  }

  public async updateProfile(
    id: string,
    profile: IProfile,
  ): Promise<Profile | null> {
    return await this.profileModel.findByIdAndUpdate(id, profile);
  }
}
