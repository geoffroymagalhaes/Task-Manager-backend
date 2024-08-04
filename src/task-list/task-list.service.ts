import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasklist } from './task-list.entity';
import { CreateTasklistDto } from './dto/create-task-list.dto';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(Tasklist)
    private tasklistRepository: Repository<Tasklist>,
  ) {}
  async getTasklist(user: User): Promise<Tasklist[]> {
    const query = this.tasklistRepository.createQueryBuilder('tasklist');
    query.where({ user });
    const tasklist = await query.getMany();
    return tasklist;
    // return await this.tasklistRepository.find();
  }
  async getTasklistById(id: string, user: User): Promise<Tasklist> {
    const found = await this.tasklistRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createTasklist(
    createTasklistDto: CreateTasklistDto,
    user: User,
  ): Promise<Tasklist> {
    const { title } = createTasklistDto;
    const tasklist = this.tasklistRepository.create({
      title,
      user,
    });
    try {
      await this.tasklistRepository.save(tasklist);
      return tasklist;
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException('Tasklist already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteTasklist(id: string, user: User): Promise<void> {
    const result = await this.tasklistRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
