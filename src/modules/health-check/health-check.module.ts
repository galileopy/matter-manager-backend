import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { PdfGenerationService } from 'src/services/pdf-generator.service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [PdfGenerationService],
})
export class HealthCheckModule {}
