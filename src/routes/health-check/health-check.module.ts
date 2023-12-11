import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { PdfGenerationService } from 'src/services/pdf-generator.service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, PdfGenerationService],
})
export class HealthCheckModule {}
