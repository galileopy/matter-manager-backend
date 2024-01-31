// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { Client } from '@prisma/client';
import { ClientRepository } from './clients.repository';
import {
  CreateClientDto,
  DeleteClientDto,
  UpdateClientDto,
} from './clients.dto';
import { transformPrismaError } from 'util/transformers';

@Controller('clients')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ClientController {
  constructor(private readonly clientRepostiory: ClientRepository) {}

  @Get()
  async getAllClients(): Promise<Client[]> {
    return this.clientRepostiory.findAll();
  }

  @Get('names')
  async getActiveNames(): Promise<{ id: string; name: string }[]> {
    return this.clientRepostiory.findActiveNames();
  }

  @Get(':clientId')
  async getById(@Param() params: { clientId: string }): Promise<Client> {
    return this.clientRepostiory.findById(params.clientId);
  }

  @Post()
  async createClient(
    @Body(new ValidationPipe({ whitelist: true })) clientsData: CreateClientDto,
  ): Promise<Client> {
    let client;
    try {
      client = await this.clientRepostiory.create(clientsData);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return client;
  }

  @Put()
  async updateClient(
    @Body(new ValidationPipe({ whitelist: true })) updateData: UpdateClientDto,
  ): Promise<Client> {
    let client;
    const { clientId, ...data } = updateData;
    try {
      client = await this.clientRepostiory.update(clientId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return client;
  }

  @Delete()
  async deleteClient(
    @Body(new ValidationPipe({ whitelist: true }))
    { clientId }: DeleteClientDto,
  ): Promise<void> {
    try {
      await this.clientRepostiory.delete(clientId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
