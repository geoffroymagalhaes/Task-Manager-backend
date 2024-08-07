import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { Tasklist } from './task-list.entity';
import { Task } from 'src/tasks/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasklist]),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
