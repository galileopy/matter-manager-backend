import { Injectable } from '@nestjs/common';
import { Comment, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findByMatterId(matterId: string): Promise<Comment> {
    return this.prismaClient.comment.findFirst({
      where: { matterId },
      take: 1,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findHistoryByMatterId(matterId: string): Promise<Comment[]> {
    return this.prismaClient.comment.findMany({
      where: { matterId },
      include: { addedByUser: true },
    });
  }

  create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaClient.comment.create({ data });
  }
}
