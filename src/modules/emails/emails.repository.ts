import { Injectable } from '@nestjs/common';
import { EmailAddress, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EmailRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findAllByClientId(clientId: string): Promise<EmailAddress[]> {
    return this.prismaClient.emailAddress.findMany({
      where: { clientId, deletedAt: null },
    });
  }

  findSendableByClientId(clientId: string): Promise<EmailAddress[]> {
    return this.prismaClient.emailAddress.findMany({
      where: { clientId, deletedAt: null, shouldSendReport: true },
    });
  }

  create(emailData: Prisma.EmailAddressCreateInput): Promise<EmailAddress> {
    return this.prismaClient.emailAddress.create({ data: emailData });
  }

  update(
    emailAddressId: string,
    emailData: Prisma.EmailAddressUpdateInput,
  ): Promise<EmailAddress> {
    return this.prismaClient.emailAddress.update({
      where: { id: emailAddressId, deletedAt: null },
      data: emailData,
    });
  }

  delete(emailId: string): Promise<EmailAddress> {
    return this.prismaClient.emailAddress.update({
      where: { id: emailId },
      data: { deletedAt: new Date() },
    });
  }
}
