// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, StreamableFile } from '@nestjs/common';

import {} from './report-attachment.dto';
import * as fs from 'fs';
import { join } from 'path';

@Controller('report-attachments')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ReportAttachmentController {
  constructor() {}

  @Get('test')
  async getReportTest(): Promise<StreamableFile> {
    return this.getFile({ fileName: 'document.pdf' });
  }

  async getFile(document: Document): Promise<StreamableFile> {
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
