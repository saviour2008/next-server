import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Result } from 'src/common/dto/result.dto';
import { ErrorCode } from 'src/common/exception/error.code';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

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

  @Put('update')
  @ApiOperation({ summary: '更新文章信息' })
  async update(@Body() article: UpdateArticleDTO) {
    // const targetArticle = await this.articlesService.findById(article.id+'');
    // if (targetArticle) {
    //   await this.articlesService.update(targetArticle);
    // }
    await this.articlesService.update(article);
    return new Result().ok();
  }

  @Get(':id')
  @ApiOperation({ summary: '查询文章' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'get ...',
    type: 'string',
  })
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findById(id);
    return new Result().ok(article);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string) {
    const article = await this.articlesService.findById(id);
    if (!article) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '文章不存在',
      );
    }
    article.delFlag = 1;
    await this.articlesService.update(article);
    return new Result().ok();
  }
}
