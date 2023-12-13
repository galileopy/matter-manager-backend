// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Req } from '@nestjs/common';
import { PdfGenerationService } from 'src/services/pdf-generator.service';
import { Roles, Unauthenticated } from 'src/decorators/auth.decorator';
import { Role } from '@prisma/client';

@Controller('health-check')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HealthCheckController {
  constructor(private readonly pdfGenerationService: PdfGenerationService) {}

  @Get()
  @Unauthenticated()
  async getHello(): Promise<string> {
    await this.pdfGenerationService.testGen();
    return 'App is running!';
  }

  @Get('authenticated')
  async checkAuth(@Req() req: Request): Promise<any> {
    return req['user'];
  }

  @Get('authenticated-admin')
  @Roles([Role.ADMIN])
  async checkAdminAuth(@Req() req: Request): Promise<any> {
    return req['user'];
  }
}
