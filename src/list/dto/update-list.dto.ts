import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateListDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  @IsOptional()
  title?: string;
}
