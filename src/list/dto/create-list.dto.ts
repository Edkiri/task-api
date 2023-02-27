import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  title: string;
}
