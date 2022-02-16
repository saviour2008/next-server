import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) // private readonly jwtService: JwtService,
  {}

  async findAll(): Promise<UsersEntity[]> {
    // relations: ['photos']， 联合查询
    return await this.usersRepository.find();
  }

  async create(user): Promise<UsersEntity[]> {
    // const { name } = user;
    // const u = await getRepository(UsersEntity).findOne({ where: { name } });
    //   .createQueryBuilder('users')
    //   .where('users.name = :name', { name });
    // const u = await qb.getOne();
    // if (u) {
    //   throw new HttpException(
    //     {
    //       message: 'Input data validation failed',
    //       error: 'name must be unique.',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    return await this.usersRepository.save(user);
  }

  async createMany(users: UsersEntity[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      users.forEach(async (user: any) => {
        await queryRunner.manager.getRepository(UsersEntity).save(user);
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findByLogin(name: string): Promise<UsersEntity> {
    const condition = { name };
    const user = await this.usersRepository.findOne(condition);
    console.log('user---' + JSON.stringify(user));
    return user;
  }

  async findUser(name: string, phone: string): Promise<UsersEntity> {
    const condition = { name, phone };
    const user = await this.usersRepository.findOne(condition);
    return user;
  }

  // 根据取出来的user信息生成 token
  // async certificate(user: UsersEntity) {
  //   const payload = {
  //     id: user.id,
  //     name: user.name,
  //     phone: user.phone,
  //     password: user.password,
  //   };
  //   const token = this.jwtService.sign(payload);
  //   return token;
  // }
}
