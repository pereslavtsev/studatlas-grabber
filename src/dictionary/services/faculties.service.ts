import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { FACULTY_SCHEMA } from '../mocks/faculty-schema.mock';
import { AbstractDictionaryService } from './abstract-dictionary.service';

@Injectable()
export class FacultiesService extends AbstractDictionaryService {
  protected async fetch(academyId: string, params?: any) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      params: {
        mode: DictionaryFilter.Faculty,
        ...params,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucFacultets"]', data);
    const entities = dataGrid.extract(FACULTY_SCHEMA);
    // tslint:disable-next-line:no-console
    console.log({ entities });
    return entities;
  }

  async fetchById(id: number, academyId: string) {
    const faculties = await this.fetch(academyId, { id });
    return faculties.pop();
  }
}
