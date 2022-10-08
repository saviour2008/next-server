/*
 * @Author: jun.zhao saviour2008@126.com
 * @Date: 2022-10-05 17:39:09
 * @LastEditors: jun.zhao saviour2008@126.com
 * @LastEditTime: 2022-10-05 22:24:13
 * @FilePath: \next-server-demo\src\modules\article\articles.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { Repository, Connection, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesEntity } from './articles.entity';
import { getPagination } from 'src/common/utils/index.util';
import { ListArticleDto } from './dto/list-article.dto';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articlesRepository: Repository<ArticlesEntity>,
    private connection: Connection,
  ) {}

  async findAll(params): Promise<ListArticleDto> {
    const { page = 1, pageSize = 10 } = params;
    const getList = this.articlesRepository
      .createQueryBuilder('user')
      .where({ delFlag: 0 })
      .orderBy({
        'user.update_time': 'DESC',
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    // console.log(total);
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }

  async create(article: CreateArticleDTO): Promise<void> {
    await this.articlesRepository.save(article);
  }

  // 根据id或id和title查询信息
  async findByTitle(title: string, id: string): Promise<ArticlesEntity> {
    const condition = { title: title };
    if (id) {
      condition['id'] = Not(id);
    }
    return await this.articlesRepository.findOne(condition);
  }

  async findById(id: string): Promise<ArticlesEntity> {
    return await this.articlesRepository.findOne(id);
  }

  // 更新
  async update(article: UpdateArticleDTO): Promise<void> {
    await this.articlesRepository.update(article.id, article);
  }
}
