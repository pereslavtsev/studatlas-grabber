import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetGroupReportDto extends AbstractEntityDto {
  @IsInt()
  groupId: number;

  @IsInt()
  semester: string;
}
