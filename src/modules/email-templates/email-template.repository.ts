import { Injectable } from '@nestjs/common';
import { EmailTemplate, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EmailTemplateRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findAll(): Promise<EmailTemplate[]> {
    return this.prismaClient.emailTemplate.findMany({
      where: { deletedAt: null },
    });
  }

  create(data: Prisma.EmailTemplateCreateInput): Promise<EmailTemplate> {
    return this.prismaClient.emailTemplate.create({ data });
  }

  update(
    templateId: string,
    data: Prisma.EmailTemplateUpdateInput,
  ): Promise<EmailTemplate> {
    return this.prismaClient.emailTemplate.update({
      where: { id: templateId, deletedAt: null },
      data,
    });
  }

  delete(templateId: string): Promise<EmailTemplate> {
    return this.prismaClient.emailTemplate.update({
      where: { id: templateId },
      data: { deletedAt: new Date() },
    });
  }
}
