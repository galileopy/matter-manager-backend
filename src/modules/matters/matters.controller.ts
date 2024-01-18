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

import { Client, EmailAddress, Matter, MatterStatus } from '@prisma/client';
import {
  CloseMatterDto,
  ConfirmMatterDto,
  CreateMatterDto,
  DeleteMatterDto,
  UpdateMatterDto,
} from './matters.dto';
import { transformPrismaError } from 'util/transformers';
import { MatterRepository } from './matters.repository';

@Controller('matters')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class MatterController {
  constructor(private readonly matterRepository: MatterRepository) {}

  @Get()
  async getMatters(): Promise<
    (Matter & { status: MatterStatus; client: Client })[]
  > {
    return this.matterRepository.findAll();
  }

  @Post()
  async createMatter(
    @Body(new ValidationPipe({ whitelist: true })) createData: CreateMatterDto,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    let matters;
    const { clientId, statusId, ...data } = createData;

    try {
      matters = await this.matterRepository.create({
        ...data,
        client: { connect: { id: clientId } },
        status: { connect: { id: statusId } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }
    return matters;
  }

  @Put()
  async updateMatter(
    @Body(new ValidationPipe({ whitelist: true })) updateData: UpdateMatterDto,
  ): Promise<EmailAddress> {
    let emails;
    const { matterId, ...data } = updateData;
    try {
      emails = await this.matterRepository.update(matterId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return emails;
  }

  @Delete()
  async deleteMatter(
    @Body(new ValidationPipe({ whitelist: true }))
    { matterId }: DeleteMatterDto,
  ): Promise<void> {
    try {
      await this.matterRepository.delete(matterId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }

  @Put('confirmation')
  async confirmMatter(
    @Body(new ValidationPipe({ whitelist: true }))
    { matterId }: ConfirmMatterDto,
  ): Promise<void> {
    try {
      await this.matterRepository.confirm(matterId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }

  @Put('close')
  async closeMatter(
    @Body(new ValidationPipe({ whitelist: true }))
    { matterId }: CloseMatterDto,
  ): Promise<void> {
    try {
      await this.matterRepository.close(matterId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
