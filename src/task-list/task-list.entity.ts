import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';
@Entity()
export class Tasklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @ManyToOne((type) => User, (user) => user.tasklist, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany((type) => Task, (task) => task.tasklist, { eager: true })
  task: Task[];
}
