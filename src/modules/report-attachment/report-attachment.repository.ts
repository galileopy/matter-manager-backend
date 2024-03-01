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

  async findActiveNames(): Promise<{ id: string; name: string }[]> {
    const activeClients = await this.prismaClient.client.findMany({
      where: { deletedAt: null },
    });

    return activeClients.map((client) => ({
      id: client.id,
      name: client.suffix ? `${client.name} ${client.suffix}` : client.name,
    }));
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
