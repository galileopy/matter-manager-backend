// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { EmailTemplate } from '@prisma/client';
import {
  CreateEmailTemplateDto,
  DeleteEmailTemplateDto,
  UpdateEmaiTemplatelBodyDto,
  UpdateEmaiTemplatelDto,
} from './email-template.dto';
import { transformPrismaError } from 'util/transformers';
import { EmailTemplateRepository } from './email-template.repository';

@Controller('email-templates')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EmailTemplateController {
  constructor(
    private readonly emailTemplateRepository: EmailTemplateRepository,
  ) {}

  @Get()
  async getTemplates(): Promise<EmailTemplate[]> {
    return this.emailTemplateRepository.findAll();
  }

  @Post()
  async createTemplate(
    @Body(new ValidationPipe({ whitelist: true }))
    data: CreateEmailTemplateDto,
  ): Promise<EmailTemplate> {
    let template;

    try {
      template = await this.emailTemplateRepository.create(data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return template;
  }

  @Put()
  async updateTemplate(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateEmaiTemplatelDto,
  ): Promise<EmailTemplate> {
    let template;
    const { templateId, ...data } = updateData;
    try {
      template = await this.emailTemplateRepository.update(templateId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return template;
  }

  @Put('body')
  async updateTemplateBody(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateEmaiTemplatelBodyDto,
  ): Promise<EmailTemplate> {
    let template;
    const { templateId, ...data } = updateData;
    try {
      template = await this.emailTemplateRepository.update(templateId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return template;
  }

  @Delete()
  async deleteTemplate(
    @Body(new ValidationPipe({ whitelist: true }))
    { templateId }: DeleteEmailTemplateDto,
  ): Promise<void> {
    try {
      await this.emailTemplateRepository.delete(templateId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }

  @Put('reinstate')
  async reinstateTemplate(
    @Body(new ValidationPipe({ whitelist: true }))
    { templateId }: DeleteEmailTemplateDto,
  ): Promise<void> {
    try {
      await this.emailTemplateRepository.reInstate(templateId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
