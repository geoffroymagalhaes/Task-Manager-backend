import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tasklist } from 'src/task-list/task-list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Tasklist, (tasklist) => tasklist.user, { eager: true })
  tasklist: Tasklist[];
}
