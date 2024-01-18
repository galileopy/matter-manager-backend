import { Injectable } from '@nestjs/common';
import { MatterStatus, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MatterStatusRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findAll(): Promise<MatterStatus[]> {
    return this.prismaClient.matterStatus.findMany();
  }

  create(statusData: Prisma.MatterStatusCreateInput): Promise<MatterStatus> {
    return this.prismaClient.matterStatus.create({ data: statusData });
  }

  update(
    statusId: string,
    statusData: Prisma.MatterStatusUpdateInput,
  ): Promise<MatterStatus> {
    return this.prismaClient.matterStatus.update({
      where: { id: statusId },
      data: statusData,
    });
  }

  async delete(statusId: string): Promise<void> {
    await this.prismaClient.matterStatus.delete({
      where: { id: statusId },
    });
    return;
  }
}
