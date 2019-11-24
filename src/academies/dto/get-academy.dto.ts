import { IsMongoId } from 'class-validator';

export class GetAcademyDto {
  @IsMongoId()
  id: string;
}
