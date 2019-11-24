import { IsInt, Matches } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListStatisticsDto extends AbstractEntityDto {
  @Matches(/\d{4}-\d{4}/)
  years: string;

  @IsInt()
  semester: 0 | 1;
}
