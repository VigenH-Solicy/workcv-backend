import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILanguage } from 'src/core/interfaces/language.interface';
import { Language } from 'src/core/schemas/language.schema';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private readonly languageModel: Model<Language>,
  ) {}

  public async setLanguage(language: ILanguage): Promise<Language> {
    const newLanguage = await new this.languageModel(language);
    return await newLanguage.save();
  }

  public async getLanguages(): Promise<Language[]> {
    return await this.languageModel.find();
  }

  public async updateLanguage(
    id: string,
    language: ILanguage,
  ): Promise<Language> {
    return await this.languageModel.findByIdAndUpdate(id, language);
  }

  public async removeLanguage(id: string): Promise<Language> {
    return await this.languageModel.findByIdAndRemove(id);
  }
}
