// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { Role, User } from '@prisma/client';
import { UserRepository } from './users.repository';
import { Roles } from 'src/decorators/auth.decorator';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './users.dto';
import { transformPrismaError } from 'util/transformers';

@Controller('users')
@Roles([Role.ADMIN])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    let user;
    try {
      user = await this.userRepository.create(userData);
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
      user = await this.userRepository.update(userId, data);
    } catch (e) {
      throw transformPrismaError(e);
    }
    return user;
  }

  @Delete()
  async deleteUser(@Body() { userId }: DeleteUserDto): Promise<void> {
    try {
      await this.userRepository.delete(userId);
      global['deleted_users'].add(userId);
    } catch (e) {
      throw transformPrismaError(e);
    }
  }
}
