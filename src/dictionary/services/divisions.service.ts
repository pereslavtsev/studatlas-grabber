import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { DIVISION_SCHEMA } from '../mocks/division-schema.mock';
import { AbstractDictionaryService } from './abstract-dictionary.service';

@Injectable()
export class DivisionsService extends AbstractDictionaryService {
  protected async fetch(academyId: string, params?: any): Promise<any[]> {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      params: {
        mode: DictionaryFilter.Division,
        ...params,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucKaf"]', data);
    return dataGrid.extract(DIVISION_SCHEMA);
  }

  async fetchById(id: number, academyId: string) {
    const divisions = await this.fetch(academyId, {
      id,
      f: DictionaryFilter.Division,
    });
    return divisions.pop();
  }
}
