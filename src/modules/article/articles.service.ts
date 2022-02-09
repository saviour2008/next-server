import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository, Not } from 'typeorm';
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
    console.log(total);
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
