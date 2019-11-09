import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { DictionaryFilter } from '../grabber/interfaces/dictionary-filter.enum';
import { DIVISION_SCHEMA } from './mocks/division-schema.mock';

@Injectable()
export class DivisionsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any): Promise<any[]> {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(GrabberService.DIRECTORY_PATH, {
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

  fetchAll(academyId: string) {
    return this.fetch(academyId);
  }
}
