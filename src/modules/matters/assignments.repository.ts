import { Injectable } from '@nestjs/common';
import { MatterAssignment, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AssignmentsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findCurrentByMatterId(matterId: string): Promise<MatterAssignment> {
    return this.prismaClient.matterAssignment.findFirst({
      include: { user: true },
      where: { matterId },
      take: 1,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(
    assignmentData: Prisma.MatterAssignmentCreateInput,
  ): Promise<MatterAssignment> {
    return this.prismaClient.matterAssignment.create({
      data: assignmentData,
    });
  }
}
