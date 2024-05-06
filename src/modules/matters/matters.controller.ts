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

import {
  Client,
  EmailAddress,
  Matter,
  MatterAssignment,
  MatterStatus,
} from '@prisma/client';
import {
  CreateAssignmentDto,
  CreateMatterDto,
  DeleteMatterDto,
  UpdateMatterDto,
} from './matters.dto';
import { transformPrismaError } from 'util/transformers';
import { MatterRepository } from './matters.repository';
import { AssignmentsRepository } from './assignments.repository';

@Controller('matters')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class MatterController {
  constructor(
    private readonly matterRepository: MatterRepository,
    private readonly assignmentRepository: AssignmentsRepository,
  ) {}

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

  @Put('reinstate')
  async reinstate(
    @Body(new ValidationPipe({ whitelist: true }))
    { matterId }: DeleteMatterDto,
  ): Promise<void> {
    try {
      await this.matterRepository.reInstate(matterId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }

  @Post(':matterId/assignment')
  async assignMatter(
    @Body(new ValidationPipe({ whitelist: true }))
    createData: CreateAssignmentDto,
    @Param() params: { matterId: string },
  ): Promise<MatterAssignment> {
    let assignment;
    const { userId, ...data } = createData;

    try {
      assignment = await this.assignmentRepository.create({
        ...data,
        matter: { connect: { id: params.matterId } },
        user: { connect: { id: userId } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }
    return assignment;
  }

  @Get(':matterId/assignment')
  async getAssignment(
    @Param() params: { matterId: string },
  ): Promise<MatterAssignment> {
    return this.assignmentRepository.findCurrentByMatterId(params.matterId);
  }
}
