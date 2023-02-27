import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2)
  content: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsBoolean()
  @IsOptional()
  important?: boolean;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  listId?: number;
}
