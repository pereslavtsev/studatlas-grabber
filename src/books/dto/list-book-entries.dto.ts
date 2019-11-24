import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListBookEntriesDto extends AbstractEntityDto {
  @IsInt()
  id: number;

  @IsInt()
  semester: number;
}
