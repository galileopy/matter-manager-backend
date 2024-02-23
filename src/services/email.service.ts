import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as mailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async send() {
    const transporter = await this.getTransporter();

    try {
      const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <ansbachertest@heartutilities.com>', // sender address
        to: 'drew.ansbacher@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      });
    } catch (e) {
      console.log('ERROR', e);
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
