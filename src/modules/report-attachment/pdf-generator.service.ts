import { Injectable, StreamableFile } from '@nestjs/common';
import { Client, Matter, MatterStatus } from '@prisma/client';
import { join } from 'path';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import { MatterRepository } from 'src/modules/matters/matters.repository';
import { CommentsRepository } from '../comments/comments.repository';

@Injectable()
export class PdfGenerationService {
  constructor(
    private readonly matterRepository: MatterRepository,
    private readonly commentRepository: CommentsRepository,
  ) {}

  async zipPdfs({ clients, date }: ZipPdfData): Promise<StreamableFile> {
    return this.generate({ client: clients[0], date });
  }

  async generate({ client, date }: GeneratePdfData): Promise<StreamableFile> {
    const matters = await this.matterRepository.findAllByClientId(client.id);
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to about:blank
    await page.goto('about:blank');

    const d = new Date(date);

    const year = d.getFullYear();
    const month = (1 + d.getMonth()).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    const html = await this.createHtml({
      clientName: client.name,
      date: month + '/' + day + '/' + year,
      matters,
    });

    // Add content to the page
    await page.evaluate((html) => {
      document.body.innerHTML = html;
    }, html);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4', // specify the format
      printBackground: true, // include background colors and images
    });
    return new StreamableFile(pdfBuffer);
  }

  async createHtml({
    clientName,
    date,
    matters,
  }: CreateHtmlData): Promise<string> {
    const matterRows = await Promise.all(
      matters.map(async (matter) => {
        const comment = await this.commentRepository.findByMatterId(matter.id);
        return `<tr>
          <td>${matter.project}</td>
          <td>${matter.fileNumber}</td>
          <td>${comment?.comment || 'n/a'}</td>
          <td>${matter.status.status}</td>
        </tr>`;
      }),
    );

    return `
      <style>
        td {
            border-bottom: 1px solid #ddd;
        }
      </style>
      <div style="width: 100%; text-align: center; padding-top: 40px;">
        <p>
            <b>
                Ansbacher Law
                <br />
                ${clientName}
                <br />
                ${date}
            </b>
        </p>
        <table style="width: 100%; padding: 0px 20px 0px 20px;">
            <thead>
              <tr style="text-align: left;">
                <th>Project</th>
                <th>File no.</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${matterRows.join()}
            </tbody>
          </table>
      </div>
    `;
  }
}

export interface ZipPdfData {
  clients: Client[];
  date: string;
}

export interface GeneratePdfData {
  client: Client;
  date: string;
}

export interface CreateHtmlData {
  clientName: string;
  date: string;
  matters: (Matter & { status: MatterStatus })[];
}
