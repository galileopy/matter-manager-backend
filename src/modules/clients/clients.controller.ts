// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { Client, User } from '@prisma/client';
import { ClientsRepository } from './clients.repository';
import {
  CreateClientsDto,
  DeleteClientsDto,
  UpdateClientsDto,
} from './clients.dto';
import { transformPrismaError } from 'util/transformers';

@Controller('clients')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UsersController {
  constructor(private readonly clientRepostiory: ClientsRepository) {}

  @Get()
  async getUsers(): Promise<Client[]> {
    return this.clientRepostiory.findAll();
  }

  @Post()
  async createUser(@Body() clientsData: CreateClientsDto): Promise<Client> {
    let user;
    try {
      user = await this.clientRepostiory.create(clientsData);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return user;
  }

  @Put()
  async updateUser(@Body() updateData: UpdateClientsDto): Promise<User> {
    let user;
    const { clientId, ...data } = updateData;
    try {
      user = await this.clientRepostiory.update(clientId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return user;
  }

  @Delete()
  async deleteUser(@Body() { clientId }: DeleteClientsDto): Promise<void> {
    try {
      await this.clientRepostiory.delete(clientId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
