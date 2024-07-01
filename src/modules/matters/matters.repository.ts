import { Injectable } from '@nestjs/common';
import {
  Client,
  Matter,
  MatterStatus,
  Prisma,
  PrismaClient,
} from '@prisma/client';

@Injectable()
export class MatterRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<
    (Matter & { status: MatterStatus; client: Client; lastUsed: Date })[]
  > {
    const matters = await this.prismaClient.matter.findMany({
      include: {
        status: true,
        client: true,
        comments: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
        internalNotes: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return matters.map((m) => {
      let maxDate = new Date(
        Math.max(
          ...[
            m.updatedAt.getTime(),
            m.comments[0]?.createdAt?.getTime() || -1,
            m.internalNotes[0]?.createdAt?.getTime() || -1,
          ],
        ),
      );

      delete m.comments;
      delete m.internalNotes;
      return {
        ...m,
        lastUsed: maxDate,
      };
    });
  }

  findAllByClientId(
    clientId: string,
  ): Promise<(Matter & { status: MatterStatus })[]> {
    return this.prismaClient.matter.findMany({
      where: {
        deletedAt: null,
        clientId,
      },
      include: {
        status: true,
      },
    });
  }

  findAllByClientIdAndStatusIds(
    clientId: string,
    statusIds: string[],
  ): Promise<(Matter & { status: MatterStatus })[]> {
    return this.prismaClient.matter.findMany({
      where: {
        deletedAt: null,
        statusId: { in: statusIds },
        clientId,
      },
      include: {
        status: true,
      },
    });
  }

  create(
    matterData: Prisma.MatterCreateInput,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    return this.prismaClient.matter.create({
      data: matterData,
      include: { status: true, client: true },
    });
  }

  update(
    matterId: string,
    matterData: Prisma.MatterUpdateInput,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    return this.prismaClient.matter.update({
      where: { id: matterId },
      data: matterData,
      include: {
        client: true,
        status: true,
      },
    });
  }

  delete(
    matterId: string,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    return this.prismaClient.matter.update({
      where: { id: matterId, deletedAt: null },
      data: { deletedAt: new Date() },
      include: {
        client: true,
        status: true,
      },
    });
  }

  reInstate(
    matterId: string,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    return this.prismaClient.matter.update({
      where: { id: matterId },
      data: { deletedAt: null },
      include: {
        client: true,
        status: true,
      },
    });
  }
}
