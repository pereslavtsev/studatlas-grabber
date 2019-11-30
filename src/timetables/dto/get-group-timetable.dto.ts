import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetGroupTimetableDto extends AbstractEntityDto {
  @IsInt()
  groupId: number;

  @IsInt()
  semester: number;

  @IsInt()
  weekday: number;

  @IsInt()
  mode: number;
}
