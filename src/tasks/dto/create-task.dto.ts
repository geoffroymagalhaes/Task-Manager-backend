import { IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  description?: string;
  @IsNotEmpty()
  @IsISO8601()
  dueDate: Date;
}
