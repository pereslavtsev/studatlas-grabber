import { Injectable } from '@nestjs/common';
import { GrabberService } from '../../grabber/services/grabber.service';
import { DataResponse } from '../../shared/interfaces/data-response.interface';
import { GetSpecialityDto } from '../dto/get-speciality.dto';
import { ListFacultySpecialitiesDto } from '../dto/list-faculty-specialities.dto';
import { ListSpecialitiesDto } from '../dto/list-specialities.dto';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Speciality } from '../interfaces/speciality.interface';
import { SPECIALITY_SCHEMA } from '../mocks/speciality-schema.mock';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly grabberService: GrabberService) {}

  protected fetch(
    { academyId, page }: ListSpecialitiesDto,
    params?: any,
  ): Promise<DataResponse<Speciality>> {
    return this.grabberService.extractFormDataGrid({
      academyId,
      sourceId: 'dictionary',
      name: 'ucSpets',
      requestConfig: {
        method: 'post',
        params: {
          mode: DictionaryFilter.Speciality,
          ...params,
        },
      },
      schema: SPECIALITY_SCHEMA,
      page,
    });
  }

  async fetchById({ id, ...params }: GetSpecialityDto) {
    const response = await this.fetch(params, {
      id,
      f: DictionaryFilter.Speciality,
    });
    return {
      ...response,
      data: [response.data.pop()],
    };
  }

  fetchByFacultyId({ facultyId, ...params }: ListFacultySpecialitiesDto) {
    return this.fetch(params, {
      f: DictionaryFilter.Faculty,
      id: facultyId,
    });
  }

  fetchAll(listSpecialitiesDto: ListSpecialitiesDto) {
    return this.fetch(listSpecialitiesDto);
  }
}
