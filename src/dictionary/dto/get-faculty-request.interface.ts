import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetFacultyDto extends AbstractEntityDto {
  @IsInt()
  id: number;
}
