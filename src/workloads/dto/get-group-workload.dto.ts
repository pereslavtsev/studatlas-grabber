import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetGroupWorkloadDto extends AbstractEntityDto {
  @IsInt()
  groupId: number;

  session: string;

  controlType: string;
}
