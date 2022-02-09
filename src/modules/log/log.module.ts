import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorController } from './error/error.controller';
import { ErrorService } from './error/error.service';
import { ErrorEntity } from './error/error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorEntity])],
  controllers: [ErrorController],
  providers: [ErrorService],
})
export class LogModule {}
