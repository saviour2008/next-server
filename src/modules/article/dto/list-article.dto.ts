import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

export class ListArticleDto extends PartialType(PaginationDTO) {
  @ApiProperty({ description: '用户名', required: false })
  userName?: string;
}