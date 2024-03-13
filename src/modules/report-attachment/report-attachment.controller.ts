// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  StreamableFile,
} from '@nestjs/common';

import {} from './report-attachment.dto';
import { DistributionListRepository } from '../distribuition-list/distribution-list.repository';
import { ReportRepository } from './report-attachment.repository';
import { PdfGenerationService } from './pdf-generator.service';

@Controller('reports')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ReportAttachmentController {
  constructor(
    private readonly pdfService: PdfGenerationService,
    private readonly reportRepository: ReportRepository,
  ) {}

  // @Get('test/distribution-list/:distributionListId')
  // async getReportTest(
  //   @Param() { distributionListId }: { distributionListId: string },
  //   @Query('date') date: string,
  // ): Promise<StreamableFile> {
  //   const list = await this.distrpibutiionListService.findById(
  //     distributionListId,
  //   );
  //   if (!list) throw new BadRequestException(`List Not Found`);
  //   if (!list.distributionClientsList.length)
  //     throw new BadRequestException(`No Clients On List Not Found`);

  //   const clients = list.distributionClientsList.map((l) => l.client);
  //   const newJob = await this.reportRepository.createPdfJob(distributionListId);

  //   return this.pdfService.zipPdfs({ clients, date });
  // }
}

export type Document = {
  fileName: string;
};
