// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { PdfGenerationService } from 'src/services/pdf-generator.service';

@Controller('health-check')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HealthCheckController {
  constructor(
    private readonly appService: HealthCheckService,
    private readonly pdfGenerationService: PdfGenerationService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    await this.pdfGenerationService.testGen();
    return this.appService.getHello();
  }
}
