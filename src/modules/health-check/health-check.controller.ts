// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { PdfGenerationService } from 'src/services/pdf-generator.service';
import { AuthGuard } from 'src/middleware/auth.guard';

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

  @Get('authenticated')
  @UseGuards(AuthGuard)
  async checkAuth(@Req() req: Request): Promise<any> {
    return req['user'];
  }
}
