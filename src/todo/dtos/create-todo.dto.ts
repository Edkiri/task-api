import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2)
  content: string;

  @IsBoolean()
  done: boolean;
}
