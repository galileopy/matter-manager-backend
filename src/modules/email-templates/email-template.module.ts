import { Module } from '@nestjs/common';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplateRepository } from './email-template.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateRepository, PrismaClient],
  exports: [EmailTemplateRepository],
})
export class EmailTemplateModule {}
