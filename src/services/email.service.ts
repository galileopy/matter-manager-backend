import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as mailer from 'nodemailer';
import { transformPrismaError } from 'util/transformers';

@Injectable()
export class EmailService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async sendTest(data: SendTestData) {
    const transporter = await this.getTransporter();

    try {
      await transporter.sendMail({
        from: `"Test" <${data.from}>`,
        to: data.to,
        cc: data.cc,
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
      });
    } catch (e) {
      console.log('ERROR', e);
      throw transformPrismaError(e);
    }

    // console.log('Message sent: %s', info.messageId);
  }

  async getTransporter() {
    const options = await this.prismaClient.smtpConfig.findFirst();
    return mailer.createTransport({
      pool: true,
      host: options.host,
      port: options.port,
      secure: options.secure,
      requireTLS: options.requireTLS,
      maxConnections: options.maxConnections,
      tls: {
        rejectUnauthorized: options.tlsRejectUnauthorized,
        ciphers: options.tlsCiphers,
      },
      service: options.service,
      auth: {
        user: options.user,
        pass: options.pass,
      },
    });
  }
}

export interface SendTestData {
  from: string;
  to: string;
  cc: string;
}
