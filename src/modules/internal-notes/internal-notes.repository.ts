import { Injectable } from '@nestjs/common';
import { InternalNote, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class InternalNotesRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findAllByMatterId(matterId: string): Promise<InternalNote[]> {
    return this.prismaClient.internalNote.findMany({
      where: { matterId },
      include: { addedByUser: true },
    });
  }

  create(data: Prisma.InternalNoteCreateInput): Promise<InternalNote> {
    return this.prismaClient.internalNote.create({ data });
  }

  update(
    id: string,
    data: Prisma.InternalNoteUpdateInput,
  ): Promise<InternalNote> {
    return this.prismaClient.internalNote.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  delete(id: string): Promise<InternalNote> {
    return this.prismaClient.internalNote.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
