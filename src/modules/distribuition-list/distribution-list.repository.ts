import { Injectable } from '@nestjs/common';
import { DistributionList, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DistributionListRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findAll(): Promise<DistributionList[]> {
    return this.prismaClient.distributionList.findMany({
      where: { deletedAt: null },
      include: {
        distributionClientsList: {
          include: { client: true },
          where: { deletedAt: null },
        },
      },
    });
  }

  create(data: Prisma.DistributionListCreateInput): Promise<DistributionList> {
    return this.prismaClient.distributionList.create({ data });
  }

  update(
    distributionListId: string,
    data: Prisma.DistributionListUpdateInput,
  ): Promise<DistributionList> {
    return this.prismaClient.distributionList.update({
      where: { id: distributionListId, deletedAt: null },
      data,
    });
  }

  async updateList(distributionListId: string, data: string[]): Promise<void> {
    await this.prismaClient.$transaction(async (tx) => {
      await tx.distributionListClient.updateMany({
        data: {
          deletedAt: new Date(),
        },
        where: {
          deletedAt: null,
          distributionListId,
          clientId: { notIn: data },
        },
      });

      const clientList = await tx.distributionListClient.findMany({
        where: {
          distributionListId,
          clientId: { in: data },
          deletedAt: null,
        },
      });

      const clientsToCreate = data.filter((clientId) => {
        const alreadyExists = !!clientList.filter((client) => {
          return client.clientId === clientId;
        }).length;
        return !alreadyExists;
      });

      await tx.distributionListClient.createMany({
        data: clientsToCreate.map((id) => ({
          distributionListId,
          clientId: id,
        })),
      });
    });
  }

  delete(distributionListId: string): Promise<DistributionList> {
    return this.prismaClient.distributionList.update({
      where: { id: distributionListId },
      data: { deletedAt: new Date() },
    });
  }
}
