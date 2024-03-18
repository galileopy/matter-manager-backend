// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  StreamableFile,
  ValidationPipe,
} from '@nestjs/common';

import { UpdateEmailTemplateDto } from './report-attachment.dto';
import { ReportRepository } from './report-attachment.repository';
import { PdfGenerationService } from './pdf-generator.service';
import { transformPrismaError } from 'util/transformers';

@Controller('reports')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ReportAttachmentController {
  constructor(
    private readonly pdfService: PdfGenerationService,
    private readonly reportRepository: ReportRepository,
  ) {}

  @Get('/job/:jobId/sample')
  async getReportTest(
    @Param() { jobId }: { jobId: string },
  ): Promise<StreamableFile> {
    const job = await this.reportRepository.getJob(jobId);
    if (!job) throw new BadRequestException(`List Not Found`);

    const list = job.distributionList;
    if (!list.distributionClientsList.length)
      throw new BadRequestException(`No Clients On List Not Found`);
    const clients = list.distributionClientsList.map((l) => l.client);
    return this.pdfService.zipPdfs({ clients, date: job.date });
  }

  @Put('/job/:jobId/emailTemplate')
  async updateTemplate(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateEmailTemplateDto,
    @Param() { jobId }: { jobId: string },
  ): Promise<void> {
    try {
      await this.reportRepository.updateEmailTemplate(
        jobId,
        updateData.emailTemplateId,
      );
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}

export type Document = {
  fileName: string;
};
