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

import { DistributionList } from '@prisma/client';
import {
  CreateDistributionListDto,
  DeleteDistributionListDto,
  UpdateClientListDto,
  UpdateListNameDto,
} from './distribution-list.dto';
import { transformPrismaError } from 'util/transformers';
import { DistributionListRepository } from './distribution-list.repository';

@Controller('distribution-lists')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class DistributionListController {
  constructor(
    private readonly distributionListRepository: DistributionListRepository,
  ) {}

  @Get()
  async getLists(): Promise<DistributionList[]> {
    return this.distributionListRepository.findAll();
  }

  @Post()
  async createList(
    @Body(new ValidationPipe({ whitelist: true }))
    data: CreateDistributionListDto,
  ): Promise<DistributionList> {
    let template;

    try {
      template = await this.distributionListRepository.create(data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return template;
  }

  @Put()
  async updateName(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateListNameDto,
  ): Promise<DistributionList> {
    let template;
    const { distributionListId, ...data } = updateData;
    try {
      template = await this.distributionListRepository.update(
        distributionListId,
        data,
      );
    } catch (e) {
      throw transformPrismaError(e);
    }
    return template;
  }

  @Put('list')
  async updateClientList(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateClientListDto,
  ): Promise<void> {
    try {
      await this.distributionListRepository.updateList(
        updateData.distributionListId,
        updateData.clientIds,
      );
    } catch (e) {
      throw transformPrismaError(e);
    }
  }

  @Delete()
  async deleteDistributionList(
    @Body(new ValidationPipe({ whitelist: true }))
    { distributionListId }: DeleteDistributionListDto,
  ): Promise<void> {
    try {
      await this.distributionListRepository.delete(distributionListId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
