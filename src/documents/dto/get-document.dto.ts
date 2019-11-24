import { IsInt } from 'class-validator';
import { AbstractEntityDto } from '../../shared/dto/abstract-entity.dto';

export class GetDocumentDto extends AbstractEntityDto {
  @IsInt()
  id: number;
}
