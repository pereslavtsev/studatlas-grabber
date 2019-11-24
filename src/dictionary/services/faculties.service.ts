import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { FACULTY_SCHEMA } from '../mocks/faculty-schema.mock';

@Injectable()
export class FacultiesService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  protected async fetch(academyId: string, params?: any) {
    const source = await this.sourcesService.findById('dictionary');
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(source.path, {
      params: {
        mode: DictionaryFilter.Faculty,
        ...params,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucFacultets"]', data);
    return dataGrid.extract(FACULTY_SCHEMA);
  }

  async fetchById(id: number, academyId: string) {
    const faculties = await this.fetch(academyId, { id });
    return faculties.pop();
  }

  fetchAll(academyId: string) {
    return this.fetch(academyId);
  }
}
