import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class ListGroupBooksDto extends AbstractEntityDto {
  @IsInt()
  groupId: number;
}
