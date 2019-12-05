import { Injectable } from '@nestjs/common';
import { GrabberService } from '../../grabber/services/grabber.service';
import { GetFacultyDto } from '../dto/get-faculty-request.interface';
import { ListFacultiesDto } from '../dto/list-faculties.dto';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { FACULTY_SCHEMA } from '../mocks/faculty-schema.mock';

@Injectable()
export class FacultiesService {
  constructor(private readonly grabberService: GrabberService) {}

  protected async fetch({ academyId, page }: ListFacultiesDto, params?: any) {
    return this.grabberService.extractFormDataGrid({
      schema: FACULTY_SCHEMA,
      requestConfig: {
        params: {
          mode: DictionaryFilter.Faculty,
          ...params,
        },
      },
      sourceId: 'dictionary',
      academyId,
      name: 'ucFacultets',
      page,
    });
  }

  async fetchById({ id, ...params }: GetFacultyDto) {
    const { data, ...fields } = await this.fetch(params, { id });
    return {
      ...fields,
      data: [data.pop()],
    };
  }

  fetchAll(listFacultiesDto: ListFacultiesDto) {
    return this.fetch(listFacultiesDto);
  }
}
