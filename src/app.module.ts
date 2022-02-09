import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/users.module';
import { env } from './config';
import { ArticlesModule } from './modules/article/articles.module';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    TypeOrmModule.forRoot(env.DATABASE_CONFIG)
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
