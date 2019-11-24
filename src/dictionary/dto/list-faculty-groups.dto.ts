import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListFacultyGroupsDto extends AbstractEntityDto {
  @IsInt()
  facultyId: number;
}
