import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListSpecialityGroupsDto extends AbstractEntityDto {
  @IsInt()
  specialityId: number;
}
