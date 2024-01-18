import { Injectable } from '@nestjs/common';
import {
  Client,
  EmailAddress,
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

  confirm(
    matterId: string,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    return this.prismaClient.matter.update({
      where: { id: matterId, deletedAt: null },
      data: { confirmedAt: new Date() },
      include: {
        client: true,
        status: true,
      },
    });
  }

  close(
    matterId: string,
  ): Promise<Matter & { status: MatterStatus; client: Client }> {
    return this.prismaClient.matter.update({
      where: { id: matterId, deletedAt: null },
      data: { closedAt: new Date() },
      include: {
        client: true,
        status: true,
      },
    });
  }
}
