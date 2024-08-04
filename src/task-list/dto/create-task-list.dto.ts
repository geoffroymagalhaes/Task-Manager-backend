import { IsNotEmpty } from 'class-validator';
export class CreateTasklistDto {
  @IsNotEmpty()
  title: string;
}
