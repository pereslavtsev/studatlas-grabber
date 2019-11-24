import { IsInt, Matches } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListFacultySchedulesDto extends AbstractEntityDto {
  @IsInt()
  facultyId: number;

  @Matches(/\d{4}-\d{4}/)
  years: string;

  @IsInt()
  semester: 1 | 2;
}
