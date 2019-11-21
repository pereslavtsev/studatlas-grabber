import { IsMongoId } from 'class-validator';

export abstract class AbstractEntityDto {
  @IsMongoId()
  academyId: string;
}
