import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Tasklist } from 'src/task-list/task-list.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Tasklist]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
