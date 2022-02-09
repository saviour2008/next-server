import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
export class ArticlesEntity extends BaseEntity{

  @Column({ length: 20 })
  title: string;

  @Column('varchar')
  content: string;

  @Column({default: 0})
  comments: number;

  @Column({default: 0})
  likes: number;

  @Column({default: 0})
  looks: number;

  @Column('varchar')
  writer: string;

  @Column({ name: 'article_picture' })
  articlePicture: string;
}
