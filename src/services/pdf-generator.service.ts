import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfGenerationService {
  generate() {
    console.log('hello');
  }
}
