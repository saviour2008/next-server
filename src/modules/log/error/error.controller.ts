import { Controller, Get, Post, Body } from '@nestjs/common';
import { Result } from 'src/common/dto/result.dto';
import { ErrorCode } from 'src/common/exception/error.code';
import { ErrorService } from './error.service';

@Controller('log')
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @Get()
  findAll() {
    return this.errorService.findAll();
  }

  @Post('error')
  async create(@Body() param) {
    const newParam = { ...param, timestamp: new Date().toISOString() };
    await this.errorService.create(newParam);
    return true;
  }
}
