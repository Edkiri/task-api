import { IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean()
  completed: boolean;
}
