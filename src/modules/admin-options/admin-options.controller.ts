// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { EmailAddress, MatterStatus, Role, SmtpConfig } from '@prisma/client';
import {
  CreateMatterStatusDto,
  DeleteMatterStatusDto,
  UpdateEmailOptionsDto,
  UpdateMatterStatusDto,
} from './admin-options.dto';
import { transformPrismaError } from 'util/transformers';
import { MatterStatusRepository } from './matters-status.repository';
import { Roles } from 'src/decorators/auth.decorator';
import { EmailOptionsRepostory } from './email-options.repository';

@Roles([Role.ADMIN])
@Controller('admin-options')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AdminOptionsController {
  constructor(
    private readonly matterStatusRepository: MatterStatusRepository,
    private readonly emailoptionsRepository: EmailOptionsRepostory,
  ) {}

  @Get('matter-status')
  async getMatterStatus(): Promise<MatterStatus[]> {
    return this.matterStatusRepository.findAll();
  }

  @Post('matter-status')
  async createMatterStatus(
    @Body(new ValidationPipe({ whitelist: true }))
    createData: CreateMatterStatusDto,
  ): Promise<MatterStatus> {
    let status;

    try {
      status = await this.matterStatusRepository.create(createData);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return status;
  }

  @Put('matter-status')
  async updateMatter(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateMatterStatusDto,
  ): Promise<EmailAddress> {
    let status;
    const { statusId, ...data } = updateData;
    try {
      status = await this.matterStatusRepository.update(statusId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return status;
  }

  @Delete('matter-status')
  async deleteMatter(
    @Body(new ValidationPipe({ whitelist: true }))
    { statusId }: DeleteMatterStatusDto,
  ): Promise<void> {
    try {
      await this.matterStatusRepository.delete(statusId);
    } catch (e) {
      throw new BadRequestException('Cannot delete status that is in use.');
    }
  }

  @Get('email-options')
  async getEmailOptions(): Promise<SmtpConfig> {
    return this.emailoptionsRepository.find();
  }

  @Put('email-options')
  async updateEmailOptions(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateEmailOptionsDto,
  ): Promise<SmtpConfig> {
    let options;
    try {
      options = await this.emailoptionsRepository.update(updateData);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return options;
  }
}
