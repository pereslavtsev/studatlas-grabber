import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchAcademies {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  term: string;
}
