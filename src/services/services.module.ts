import { Module } from '@nestjs/common';
import { PdfGenerationService } from 'src/services/pdf-generator.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PdfGenerationService],
  exports: [PdfGenerationService],
})
export class ServicesModule {}
