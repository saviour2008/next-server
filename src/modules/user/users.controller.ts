import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from 'src/common/dto/result.dto';
import { ErrorCode } from 'src/common/exception/error.code';
import { encryptPassword, makeSalt } from 'src/common/utils/auth.util';
import { AuthService } from '../auth/auth.service';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Post()
  // async create(@Body() param) {
  //   const newParam = { ...param, status: true };
  //   await this.usersService.create(newParam);
  //   return true;
  // }

  @Post('login')
  async login(@Body() param) {
    const { userName: name, password } = param;
    const authResult = await this.authService.validateUser(name, password);
    // const user = await this.usersService.findByLogin(name);
    switch (authResult.code) {
      case 1:
        const token = await this.authService.certificate(authResult.user);
        return new Result().ok({ info: { token } });
      case 2:
        return new Result().error(
          new ErrorCode().INTERNAL_SERVER_ERROR,
          '密码错误',
        );
      default:
        return new Result().error(
          new ErrorCode().INTERNAL_SERVER_ERROR,
          '该用户不存在',
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() param) {
    const user = await this.usersService.findUser(param.userName, param.phone);
    if (user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '该用户已存在',
      );
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(param.password, salt); // 加密密码
    const newUser: UsersEntity = new UsersEntity();
    newUser.name = param.userName;
    newUser.phone = param.phone;
    newUser.password = hashPassword;
    newUser.salt = salt;
    const insertedUser = await this.usersService.create(newUser);
    return new Result().ok();
  }
}
