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

  findAll(): Promise<(Matter & { status: MatterStatus; client: Client })[]> {
    return this.prismaClient.matter.findMany({
      include: {
        status: true,
        client: true,
      },
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
