import { Injectable } from '@nestjs/common';
import {
  Client,
  DistributionList,
  DistributionListClient,
  PdfJob,
  Prisma,
  PrismaClient,
} from '@prisma/client';

@Injectable()
export class ReportRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  createPdfJob(data: Prisma.PdfJobCreateInput): Promise<PdfJob> {
    return this.prismaClient.pdfJob.create({
      data,
    });
  }

  updateEmailTemplate(jobId: string, emailTemplateId: string): Promise<PdfJob> {
    return this.prismaClient.pdfJob.update({
      data: { emailTemplateId },
      where: { id: jobId },
    });
  }

  getJob(jobId: string) {
    return this.prismaClient.pdfJob.findUnique({
      where: { id: jobId },
      include: {
        emailTemplate: true,
        distributionList: {
          include: {
            distributionClientsList: {
              include: { client: true },
              where: { deletedAt: null },
            },
          },
        },
      },
    });
  }
}
