import { Controller, Get } from '@nestjs/common';
import { EducationService } from 'src/profile/services/education/education.service';
import { ExperienceService } from 'src/profile/services/experience/experience.service';
import { LanguageService } from 'src/profile/services/language/language.service';
import { ProfileService } from 'src/profile/services/profile/profile.service';
import { ProjectService } from 'src/profile/services/project/project.service';
import { SkillService } from 'src/profile/services/skill/skill.service';

@Controller('me')
export class GetController {
  constructor(
    private readonly educationService: EducationService,
    private readonly experienceService: ExperienceService,
    private readonly languageService: LanguageService,
    private readonly profileService: ProfileService,
    private readonly projectService: ProjectService,
    private readonly skillService: SkillService,
  ) {}

  @Get()
  public async getProfile(): Promise<any> {
    const educations = await this.educationService.getEducations();
    const experience = await this.experienceService.getAllExperiences();
    const languages = await this.languageService.getLanguages();
    const profile = await this.profileService.getProfile();
    const projects = await this.projectService.getProjects();
    const skills = await this.skillService.getSkills();
    return { educations, experience, languages, profile, projects, skills };
  }
}
