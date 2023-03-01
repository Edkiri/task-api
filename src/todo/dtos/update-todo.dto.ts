import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsBoolean()
  @IsOptional()
  today?: boolean;

  @IsBoolean()
  @IsOptional()
  important?: boolean;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  listId?: number;
}
