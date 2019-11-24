import { IsInt, Matches } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListDivisionTimetablesDto extends AbstractEntityDto {
  @IsInt()
  divisionId: number;

  @Matches(/\d{4}-\d{4}/)
  years: string;

  @IsInt()
  semester: 1 | 2;
}
