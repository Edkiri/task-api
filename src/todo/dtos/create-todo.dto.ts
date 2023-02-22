import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2)
  name: string;
}
