import { Injectable } from '@nestjs/common';
import { PdfJob, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ReportRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  createPdfJob(data: Prisma.PdfJobCreateInput): Promise<PdfJob> {
    return this.prismaClient.pdfJob.create({
      data,
    });
  }
}
