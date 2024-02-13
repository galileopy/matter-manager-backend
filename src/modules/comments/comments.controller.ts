// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';

import { Comment } from '@prisma/client';
import { CreateCommentDto } from './comments.dto';
import { transformPrismaError } from 'util/transformers';
import { CommentsRepository } from './comments.repository';

@Controller('comments')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class InternalNotesController {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  @Get(':matterId')
  async getComment(@Param() params: { matterId: string }): Promise<Comment> {
    return this.commentsRepository.findByMatterId(params.matterId);
  }

  @Get(':matterId/history')
  async getCommentHistory(
    @Param() params: { matterId: string },
  ): Promise<Comment[]> {
    return this.commentsRepository.findHistoryByMatterId(params.matterId);
  }

  @Post()
  async createComment(
    @Body(new ValidationPipe({ whitelist: true }))
    createData: CreateCommentDto,
    @Request() req: { user: { id: string } },
  ): Promise<Comment> {
    let comment;
    const addedBy = req['user'].id;
    const { matterId, ...data } = createData;

    try {
      comment = await this.commentsRepository.create({
        ...data,
        matter: { connect: { id: matterId } },
        addedByUser: { connect: { id: addedBy } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }
    return comment;
  }
}
