import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/users.module';
import { env } from './config';
import { ArticlesModule } from './modules/article/articles.module';
import { LogModule } from './modules/log/log.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersController } from './modules/user/users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ArticlesModule,
    LogModule,
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
  ],
  controllers: [AppController, CatsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
