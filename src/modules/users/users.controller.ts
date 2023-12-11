// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Controller('users')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UsersController {
  constructor(private readonly userRepository: UsersRepository) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }
}
