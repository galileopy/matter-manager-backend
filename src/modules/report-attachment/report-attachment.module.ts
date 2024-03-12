import { Module } from '@nestjs/common';
import { ReportAttachmentController } from './report-attachment.controller';
import { ReportRepository } from './report-attachment.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';
import { DistributionListRepository } from '../distribuition-list/distribution-list.repository';
import { PdfGenerationService } from './pdf-generator.service';
import { MatterModule } from '../matters/matters.module';
import { CommentsRepository } from '../comments/comments.repository';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [ServicesModule, MatterModule, CommentsModule],
  controllers: [ReportAttachmentController],
  providers: [
    ReportRepository,
    PdfGenerationService,
    DistributionListRepository,
    PrismaClient,
  ],
  exports: [ReportRepository, PdfGenerationService, DistributionListRepository],
})
export class ReportAttachmentModule {}
