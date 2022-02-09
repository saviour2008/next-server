import { Controller, Get, Post, Body } from '@nestjs/common';
import { Result } from 'src/common/dto/result.dto';
import { ErrorCode } from 'src/common/exception/error.code';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() param) {
    const newParam = { ...param, status: true };
    await this.usersService.create(newParam);
    return true;
  }

  @Post('login')
  async login(@Body() param) {
    const user = await this.usersService.findByName(
      param.userName,
      param.password,
    );
    if (!user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '该用户不存在',
      );
    }
    return new Result().ok(user);
  }
}
