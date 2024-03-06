import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

export function transformPrismaError(err) {
  console.log('CODE', err.code);
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return new UnprocessableEntityException({
        [err.meta.target]: ['Value must be unique'],
      });
    case 'P2014':
      // handling invalid id errors
      return new UnprocessableEntityException({
        [err.meta.target]: ['Invalid ID'],
      });
    case 'P2003':
      // handling invalid data errors
      return new UnprocessableEntityException({
        [err.meta.target]: ['Invalid input data'],
      });
    case 'P2025':
      // not found exceptions
      return new BadRequestException(`${err.meta.modelName} Not Found`);
    case 'EMESSAGE':
      return new BadRequestException(`Check console log for full error`);
    default:
      // handling all other errors
      return new InternalServerErrorException(
        `Something went wrong: ${err.message}`,
      );
  }
}
