// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  ValidationPipe,
} from '@nestjs/common';

import { EmailAddress, InternalNote } from '@prisma/client';
import {
  CreateInternalNoteDto,
  DeleteInternalNoteDto,
  UpdateInternalNoteDto,
} from './internal-notes.dto';
import { transformPrismaError } from 'util/transformers';
import { InternalNotesRepository } from './internal-notes.repository';

@Controller('internal-notes')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class InternalNotesController {
  constructor(
    private readonly internalNotesRepository: InternalNotesRepository,
  ) {}

  @Get(':matterId')
  async getEmailsByMatterId(
    @Param() params: { matterId: string },
  ): Promise<InternalNote[]> {
    return this.internalNotesRepository.findAllByMatterId(params.matterId);
  }

  @Post()
  async createEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    createData: CreateInternalNoteDto,
    @Request() req: { user: { id: string } },
  ): Promise<EmailAddress> {
    let internalNotes;
    const addedBy = req['user'].id;
    const { matterId, ...data } = createData;

    try {
      internalNotes = await this.internalNotesRepository.create({
        ...data,
        matter: { connect: { id: matterId } },
        addedByUser: { connect: { id: addedBy } },
      });
    } catch (e) {
      throw transformPrismaError(e);
    }
    return internalNotes;
  }

  @Put()
  async updateEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: UpdateInternalNoteDto,
  ): Promise<InternalNote> {
    let internalNotes;
    const { internalNoteId, ...data } = updateData;
    try {
      internalNotes = await this.internalNotesRepository.update(
        internalNoteId,
        data,
      );
    } catch (e) {
      throw transformPrismaError(e);
    }
    return internalNotes;
  }

  @Delete()
  async deleteEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    { internalNoteId }: DeleteInternalNoteDto,
  ): Promise<void> {
    try {
      await this.internalNotesRepository.delete(internalNoteId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
