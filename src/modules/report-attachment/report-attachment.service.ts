import { Injectable } from '@nestjs/common';

import { ReportRepository } from './report-attachment.repository';

import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { JobDescription } from './interfaces/report-attachment.db';
import { Client, EmailSendStatus, EmailTemplate } from '@prisma/client';
import { PdfGenerationService } from './pdf-generator.service';
import { EmailOptionsRepository } from '../admin-options/email-options.repository';
import { EmailRepository } from '../emails/emails.repository';
import { EmailService } from 'src/services/email.service';

enum Events {
  CLIENT_EMAIL_REPORT_REQUESTED = 'CLIENT_EMAIL_REPORT_REQUESTED',
}

@Injectable()
export class ReportAttachmentService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private eventEmitter: EventEmitter2,
    private readonly pdfService: PdfGenerationService,
    private readonly smtpSettings: EmailOptionsRepository,
    private readonly emailRepository: EmailRepository,
    private readonly emailService: EmailService,
  ) {}

  async startJobs(jobDescription: JobDescription): Promise<void> {
    this.eventEmitter.emit(
      Events.CLIENT_EMAIL_REPORT_REQUESTED,
      jobDescription,
    );

    return;
  }

  @OnEvent(Events.CLIENT_EMAIL_REPORT_REQUESTED)
  async onEmailReportRequested(jobDescription: JobDescription): Promise<void> {
    const smtpSettings = await this.smtpSettings.find();
    if (!smtpSettings || !smtpSettings.user) {
      throw new Error('No Smtp User');
    }

    const testEmail = smtpSettings.testEmail;

    const { emailTemplate } = jobDescription;

    for (const client of jobDescription.distributionList
      .distributionClientsList) {
      const emailSend = await this.reportRepository.createEmailSend(
        jobDescription.id,
        client.clientId,
      );

      let attachment: Buffer = null;
      try {
        attachment = await this.pdfService.generatePDF({
          client: client.client,
          date: jobDescription.date,
        });
        await this.reportRepository.updateEmailSend(
          emailSend.id,
          EmailSendStatus.ATTACHMENT_GENERATED,
        );
      } catch (e) {
        await this.reportRepository.updateEmailSend(
          emailSend.id,
          EmailSendStatus.ATTACHMENT_FAILED,
          e.message,
        );
        continue;
      }

      try {
        const emails = (
          await this.emailRepository.findSendableByClientId(client.id)
        ).map((email) => email.email);

        await this.emailService.send({
          from: smtpSettings.user,
          to: testEmail ? [testEmail] : emails,
          cc: jobDescription.cc,
          html: emailTemplate.body,
          attachment,
          subject: this.getSubject(emailTemplate, client.client),
          clientName: client.client.name,
        });
        await this.reportRepository.updateEmailSend(
          emailSend.id,
          EmailSendStatus.SENT,
        );
      } catch (e) {
        await this.reportRepository.updateEmailSend(
          emailSend.id,
          EmailSendStatus.FAILED,
          e.message,
        );
      }
    }
  }

  getSubject(template: EmailTemplate, client: Client): string {
    const prefix = template.subjectPreText ? `${template.subjectPreText} ` : '';

    const clientText = template.includeClientName ? client.name : '';

    const postfix = template.subjectPostText
      ? ` ${template.subjectPostText}`
      : '';

    return `${prefix}${clientText}${postfix}`;
  }
}
