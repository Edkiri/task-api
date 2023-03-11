import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
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

  @IsDate()
  @IsOptional()
  expiresOn?: Date;
}
