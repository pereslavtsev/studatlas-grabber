import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListFacultySpecialitiesDto extends AbstractEntityDto {
  @IsInt()
  facultyId: number;
}
