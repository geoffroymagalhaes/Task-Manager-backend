import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Tasklist } from 'src/task-list/task-list.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Tasklist)
    private taskListRepository: Repository<Tasklist>,
  ) {}
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, tasklistId } = filterDto;
    if (!tasklistId) {
      throw new NotFoundException('Task list ID is required');
    }
    const query = this.tasksRepository.createQueryBuilder('task');
    query.andWhere('task.tasklist.id = :tasklistId', { tasklistId });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async getTaskById(id: string, tasklistId: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: { id, tasklist: { id: tasklistId } },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createTask(
    createTaskDto: CreateTaskDto,
    tasklistId: string,
  ): Promise<Task> {
    const { title, description, dueDate } = createTaskDto;
    const tasklist = await this.taskListRepository.findOne({
      where: { id: tasklistId },
    });
    const task = this.tasksRepository.create({
      title,
      description,
      dueDate,
      status: TaskStatus.OPEN,
      tasklist,
    });
    await this.tasksRepository.save(task);
    return task;
  }
  async deleteTask(id: string, tasklistId: string): Promise<void> {
    const result = await this.tasksRepository.delete({
      id,
      tasklist: { id: tasklistId },
    });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    tasklistId: string,
  ): Promise<Task> {
    const task = await this.getTaskById(id, tasklistId);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
