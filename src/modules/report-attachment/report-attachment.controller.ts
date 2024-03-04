// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, StreamableFile } from '@nestjs/common';

import {} from './report-attachment.dto';
import * as fs from 'fs';
import { join } from 'path';
import { PdfGenerationService } from 'src/services/pdf-generator.service';

@Controller('report-attachments')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ReportAttachmentController {
  constructor(private readonly pdfService: PdfGenerationService) {}

  @Get('test')
  async getReportTest(): Promise<StreamableFile> {
    return this.getFile({ fileName: 'document.pdf' });
  }

  async getFile(document: Document): Promise<StreamableFile> {
    await this.pdfService.generate();
    const filename = document.fileName;
    const filepath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'util',
      'pdfs',
      filename,
    );
    const file = fs.createReadStream(join(filepath));
    return new StreamableFile(file);
  }
}

export type Document = {
  fileName: string;
};
