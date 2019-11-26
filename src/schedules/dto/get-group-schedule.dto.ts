import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetGroupScheduleDto extends AbstractEntityDto {
  @IsInt()
  groupId: number;

  @IsInt()
  semester: 1 | 2;
}
