import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { Profile, ProfileSchema } from 'src/core/schemas/profile.schema';
import { Project, ProjectSchema } from 'src/core/schemas/project.schema';
import { ProjectService } from './services/project/project.service';
import { ProjectController } from './controllers/project/project.controller';
import {
  Experience,
  ExperienceSchema,
} from 'src/core/schemas/experience.schema';
import { ExperienceController } from './controllers/experience/experience.controller';
import { ExperienceService } from './services/experience/experience.service';
import { SkillService } from './services/skill/skill.service';
import { SkillController } from './controllers/skill/skill.controller';
import { Skill, SkillSchema } from 'src/core/schemas/skill.schema';
import { Education, EducationSchema } from 'src/core/schemas/education.schema';
import { EducationController } from './controllers/education/education.controller';
import { EducationService } from './services/education/education.service';
import { Language, LanguageSchema } from 'src/core/schemas/language.schema';
import { LanguageController } from './controllers/language/language.controller';
import { LanguageService } from './services/language/language.service';
import { GetController } from './controllers/get/get.controller';
import { UploadController } from './controllers/upload/upload.controller';
import { Image, ImageSchema } from 'src/core/schemas/image.schema';
import { UploadService } from './services/upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Experience.name, schema: ExperienceSchema },
      { name: Skill.name, schema: SkillSchema },
      { name: Education.name, schema: EducationSchema },
      { name: Language.name, schema: LanguageSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
  controllers: [
    ProfileController,
    ProjectController,
    ExperienceController,
    SkillController,
    EducationController,
    LanguageController,
    GetController,
    UploadController,
  ],
  providers: [
    ProfileService,
    ProjectService,
    ExperienceService,
    SkillService,
    EducationService,
    LanguageService,
    UploadService,
  ],
})
export class ProfileModule {}
