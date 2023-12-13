// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { Role, User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { Roles } from 'src/decorators/auth.decorator';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './users.dto';
import { transformPrismaError } from 'util/transformers';

@Controller('users')
@Roles([Role.ADMIN])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UsersController {
  constructor(private readonly userRepository: UsersRepository) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    let user;
    try {
      user = await this.userRepository.createUser(userData);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return user;
  }

  @Put()
  async updateUser(@Body() updateData: UpdateUserDto): Promise<User> {
    let user;
    const { userId, ...data } = updateData;
    try {
      user = await this.userRepository.updateUser(userId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return user;
  }

  @Delete()
  async deleteUser(@Body() { userId }: DeleteUserDto): Promise<void> {
    try {
      await this.userRepository.deleteUser(userId);
      global['deleted_users'].add(userId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
