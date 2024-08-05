import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Tasklist } from 'src/task-list/task-list.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
  @Get('/:tasklistId/:id')
  getTaskById(
    @Param('id') id: string,
    @Param('tasklistId') tasklistId: string,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, tasklistId);
  }

  @Post('/:tasklistId')
  createTask(
    @Param('tasklistId') tasklistId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, tasklistId);
  }

  @Delete('/:tasklistId/:id')
  deleteTask(
    @Param('id') id: string,
    @Param('tasklistId') tasklistId: string,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, tasklistId);
  }
  @Patch('/:tasklistId/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
    @Param('tasklistId') tasklistId: string,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status, tasklistId);
  }
}
