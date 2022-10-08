/*
 * @Author: jun.zhao saviour2008@126.com
 * @Date: 2022-10-05 17:39:09
 * @LastEditors: jun.zhao saviour2008@126.com
 * @LastEditTime: 2022-10-06 11:35:37
 * @FilePath: \next-server-demo\src\modules\auth\auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/common/utils/auth.util';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(name: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.usersService.findByLogin(name);
    if (user) {
      const dbPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (dbPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      return `账号或密码错误`;
    }
  }

  // 根据token获取用户信息
  async getUserInfo(token: any): Promise<any> {
    try {
      const userInfo = this.jwtService.decode(token.slice(7));
      return userInfo;
    } catch (error) {
      return `该账号无法查找`;
    }
  }
}
