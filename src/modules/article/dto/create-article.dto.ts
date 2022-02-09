import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dto/base.dto';

export class CreateArticleDTO extends BaseDTO{
  @ApiProperty({ description: '文章标题' })
  title: string;

  @ApiProperty({ description: '文章内容' })
  content: string;

  @ApiProperty({ description: '作者' })
  writer: string;

  @ApiProperty({ description: '封面图片' })
  articlePicture: string;
}
