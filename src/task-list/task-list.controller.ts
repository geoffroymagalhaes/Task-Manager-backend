import { Controller, UseGuards } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { Tasklist } from './task-list.entity';
import { Get, Param, Post, Delete, Body } from '@nestjs/common';
import { CreateTasklistDto } from './dto/create-task-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('task-list')
@UseGuards(AuthGuard('jwt'))
export class TaskListController {
  constructor(private tasklistService: TaskListService) {}

  @Get()
  getTasklist(@GetUser() user: User): Promise<Tasklist[]> {
    return this.tasklistService.getTasklist(user);
  }
  @Get('/:id')
  getTasklistById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Tasklist> {
    return this.tasklistService.getTasklistById(id, user);
  }

  @Post()
  createTask(
    @Body() createTasklistDto: CreateTasklistDto,
    @GetUser() user: User,
  ): Promise<Tasklist> {
    return this.tasklistService.createTasklist(createTasklistDto, user);
  }

  @Delete('/:id')
  deleteTask(@GetUser() user: User, @Param('id') id: string): Promise<void> {
    return this.tasklistService.deleteTasklist(id, user);
  }
}
