import { Module } from '@nestjs/common';
import { PdfGenerationService } from 'src/services/pdf-generator.service';
import { EmailService } from './email.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [],
  providers: [PdfGenerationService, EmailService, PrismaClient],
  exports: [PdfGenerationService, EmailService],
})
export class ServicesModule {}
