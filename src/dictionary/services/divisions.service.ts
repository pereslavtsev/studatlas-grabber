import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Division } from '../interfaces/division.interface';
import { DIVISION_SCHEMA } from '../mocks/division-schema.mock';

@Injectable()
export class DivisionsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  protected async fetch(academyId: string, params?: any): Promise<Division[]> {
    const source = await this.sourcesService.findById('dictionary');
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(source.path, {
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
