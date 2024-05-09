// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  Request,
} from '@nestjs/common';

import { DistributionList, JobType } from '@prisma/client';
import {
  CreateDistributionListDto,
  CreateEmailJobDto,
  CreateJobDto,
  DeleteDistributionListDto,
  UpdateClientListDto,
  UpdateListNameDto,
} from './distribution-list.dto';
import { transformPrismaError } from 'util/transformers';
import { DistributionListRepository } from './distribution-list.repository';
import { ReportRepository } from '../report-attachment/report-attachment.repository';
import { MatterRepository } from '../matters/matters.repository';

@Controller('distribution-lists')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class DistributionListController {
  constructor(
    private readonly distributionListRepository: DistributionListRepository,
    private readonly pdfJobRepostory: ReportRepository,
    private readonly matterRepository: MatterRepository,
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

  @Put('reinstate')
  async reInstate(
    @Body(new ValidationPipe({ whitelist: true }))
    { distributionListId }: DeleteDistributionListDto,
  ): Promise<void> {
    try {
      await this.distributionListRepository.reInstate(distributionListId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }

  @Post('/:distributionListId/report-job')
  async createJob(
    @Param() { distributionListId }: { distributionListId: string },
    @Request() req: { user: { id: string } },
    @Body(new ValidationPipe({ whitelist: true }))
    data: CreateJobDto,
  ): Promise<{ jobId: string; noMatterClients: string[] }> {
    let job;
    let matterAmounts = [];

    const d = new Date(data.date);

    const year = d.getFullYear();
    const month = (1 + d.getMonth()).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    const formattedDate = `${month}/${day}/${year}`;

    try {
      const list = await this.distributionListRepository.findById(
        distributionListId,
      );

      if (!list) throw new BadRequestException('Could not find list');

      matterAmounts = await Promise.all(
        list.distributionClientsList.map(async (clientList) => {
          const matters =
            await this.matterRepository.findAllByClientIdAndStatusIds(
              clientList.client.id,
              data.statusIds,
            );

          return { name: clientList.client.name, matterAmount: matters.length };
        }),
      );

      job = await this.pdfJobRepostory.createPdfJob({
        ...data,
        type: JobType.REPORT_EMAIL,
        date: formattedDate,
        distributionList: { connect: { id: distributionListId } },
        user: { connect: { id: req['user'].id } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }

    const noMatterClients = matterAmounts.reduce((cur, val) => {
      if (!val.matterAmount) {
        cur.push(val.name);
      }
      return cur;
    }, []);

    return { jobId: job.id, noMatterClients };
  }

  @Post('/:distributionListId/no-report-job')
  async createNoReportJob(
    @Param() { distributionListId }: { distributionListId: string },
    @Request() req: { user: { id: string } },
    @Body(new ValidationPipe({ whitelist: true }))
    data: CreateEmailJobDto,
  ): Promise<{ jobId: string }> {
    let job;

    try {
      job = await this.pdfJobRepostory.createPdfJob({
        distributionList: { connect: { id: distributionListId } },
        emailTemplate: { connect: { id: data.emailTemplateId } },
        user: { connect: { id: req['user'].id } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }

    return { jobId: job.id };
  }
}
