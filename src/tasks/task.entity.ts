import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Tasklist } from 'src/task-list/task-list.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  status: TaskStatus;

  @ManyToOne((type) => Tasklist, (tasklist) => tasklist.task, { eager: false })
  tasklist: Tasklist;
}
