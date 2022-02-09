import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dto/base.dto';
import { CreateArticleDTO } from './create-article.dto';

export class UpdateArticleDTO extends PartialType(CreateArticleDTO) {
  @ApiProperty({ description: '文章ID', required: false })
  id?: number;
}
