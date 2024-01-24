import { Injectable } from '@nestjs/common';
import { Client, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ClientRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findAll(): Promise<Client[]> {
    return this.prismaClient.client.findMany();
  }

  findById(clientId): Promise<Client> {
    return this.prismaClient.client.findUnique({ where: { id: clientId } });
  }

  create(userData: Prisma.ClientCreateInput): Promise<Client> {
    return this.prismaClient.client.create({ data: userData });
  }

  update(
    clientId: string,
    userData: Prisma.ClientUpdateInput,
  ): Promise<Client> {
    return this.prismaClient.client.update({
      where: { id: clientId },
      data: userData,
    });
  }

  delete(userId: string): Promise<Client> {
    return this.prismaClient.client.update({
      where: { id: userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
