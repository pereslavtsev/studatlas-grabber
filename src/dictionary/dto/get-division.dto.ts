import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetDivisionDto extends AbstractEntityDto {
  @IsInt()
  id: number;
}
