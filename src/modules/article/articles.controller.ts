import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/dto/result.dto';
import { ErrorCode } from 'src/common/exception/error.code';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { ListArticleDto } from './dto/list-article.dto';

@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: '查询文章列表' })
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({
    status: 200,
    description: 'get ...',
    type: 'string',
  })
  async findAll(@Query() articleQuery: ListArticleDto) {
    const articleList = await this.articlesService.findAll(articleQuery);

    // return {
    //   code: 'success',
    //   message: '',
    //   data: { ...articleList },
    // };
    return new Result().ok(articleList);
  }

  @Post()
  @ApiOperation({ summary: '新增文章信息' })
  async create(@Body() article: CreateArticleDTO) {
    const existSameArticle = await this.articlesService.findByTitle(
      article.title,
      '',
    );
    if (existSameArticle) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '文章已存在',
      );
    }
    await this.articlesService.create(article);
    return new Result().ok();
  }
}
