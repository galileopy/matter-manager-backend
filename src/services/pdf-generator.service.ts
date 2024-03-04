import { Injectable } from '@nestjs/common';
import { join } from 'path';
import puppeteer from 'puppeteer';
import fs from 'fs';

@Injectable()
export class PdfGenerationService {
  async generate() {
    const filepath = join(
      __dirname,
      '..',
      '..',
      '..',
      'util',
      'pdfs',
      'hello.pdf',
    );

    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to about:blank
    await page.goto('about:blank');

    // Add content to the page
    await page.evaluate(() => {
      document.body.innerText = 'Hello, world!';
    });

    // Generate PDF
    await page.pdf({ path: filepath, format: 'A4' });

    // Close the browser
    await browser.close();
  }
}
