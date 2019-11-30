import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export abstract class AbstractEntityDto {
  @IsMongoId()
  academyId: string;

  @IsInt()
  @IsOptional()
  page?: number;
}
