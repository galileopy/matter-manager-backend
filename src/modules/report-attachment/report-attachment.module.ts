import { Module } from '@nestjs/common';
import { ReportAttachmentController } from './report-attachment.controller';
import { ClientRepository } from './report-attachment.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [ReportAttachmentController],
  providers: [ClientRepository, PrismaClient],
  exports: [ClientRepository],
})
export class ReportAttachmentModule {}
