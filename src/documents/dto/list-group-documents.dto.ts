import { IsInt, Matches } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListGroupDocumentsDto extends AbstractEntityDto {
  @IsInt()
  facultyId: number;

  @IsInt()
  groupId: number;

  @Matches(/\d{4}-\d{4}/)
  years: string;

  @IsInt()
  semester: number;
}
