import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEntity } from './error.entity';

@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(ErrorEntity)
    private readonly ErrorRepository: Repository<ErrorEntity>,
  ) {}

  async findAll(): Promise<ErrorEntity[]> {
    // relations: ['photos']， 联合查询
    return await this.ErrorRepository.find();
  }

  async create(error): Promise<ErrorEntity[]> {
    return await this.ErrorRepository.save(error);
  }
}
