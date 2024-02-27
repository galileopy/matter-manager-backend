// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { EmailAddress, EmailTemplate } from '@prisma/client';
import {
  CreateEmailTemplateDto,
  DeleteEmailTemplateDto,
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
  async createEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    data: CreateEmailTemplateDto,
  ): Promise<EmailAddress> {
    let template;

    try {
      template = await this.emailTemplateRepository.create(data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return template;
  }

  @Put()
  async updateEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateEmaiTemplatelDto,
  ): Promise<EmailAddress> {
    let emails;
    const { templateId, ...data } = updateData;
    try {
      emails = await this.emailTemplateRepository.update(templateId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return emails;
  }

  @Delete()
  async deleteEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    { templateId }: DeleteEmailTemplateDto,
  ): Promise<void> {
    try {
      await this.emailTemplateRepository.delete(templateId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
