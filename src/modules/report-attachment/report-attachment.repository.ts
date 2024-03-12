import { Injectable } from '@nestjs/common';
import { PdfJob, PrismaClient } from '@prisma/client';

@Injectable()
export class ReportRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  createPdfJob(distributionListId: string): Promise<PdfJob> {
    return this.prismaClient.pdfJob.create({
      data: {
        distributionListId,
      },
    });
  }
}
