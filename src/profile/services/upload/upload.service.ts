import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from 'src/core/schemas/image.schema';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}

  public async saveImage(nameToSave: string): Promise<Image> {
    const file = {
      name: nameToSave,
    };
    const newImage = await new this.imageModel(file);
    return await newImage.save();
  }

  public async removeImage(nameToDelete: string): Promise<boolean> {
    return await this.imageModel.findOneAndRemove({ name: nameToDelete });
  }
}
