// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { EmailAddress } from '@prisma/client';
import { CreateEmailDto, DeleteEmailDto, UpdateEmailDto } from './emails.dto';
import { transformPrismaError } from 'util/transformers';
import { EmailRepository } from './emails.repository';

@Controller('emails')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EmailController {
  constructor(private readonly emailRepository: EmailRepository) {}

  @Get(':clientId')
  async getEmailsByClientId(
    @Param() params: { clientId: string },
  ): Promise<EmailAddress[]> {
    return this.emailRepository.findAllByClientId(params.clientId);
  }

  @Post()
  async createEmail(
    @Body(new ValidationPipe({ whitelist: true })) createData: CreateEmailDto,
  ): Promise<EmailAddress> {
    let emails;
    const { clientId, ...data } = createData;

    try {
      emails = await this.emailRepository.create({
        ...data,
        client: { connect: { id: clientId } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }
    return emails;
  }

  @Put()
  async updateEmail(
    @Body(new ValidationPipe({ whitelist: true })) updateData: UpdateEmailDto,
  ): Promise<EmailAddress> {
    let emails;
    const { emailId, ...data } = updateData;
    try {
      emails = await this.emailRepository.update(emailId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return emails;
  }

  @Delete()
  async deleteEmail(
    @Body(new ValidationPipe({ whitelist: true })) { emailId }: DeleteEmailDto,
  ): Promise<void> {
    try {
      await this.emailRepository.delete(emailId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
