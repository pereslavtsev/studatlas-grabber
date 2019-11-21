import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Speciality } from '../interfaces/speciality.interface';
import { SPECIALITY_SCHEMA } from '../mocks/speciality-schema.mock';

@Injectable()
export class SpecialitiesService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  protected async fetch(academyId: string, params?: any): Promise<Speciality[]> {
    const source = await this.sourcesService.findById('dictionary');
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(source.path, {
      params: {
        mode: DictionaryFilter.Speciality,
        ...params,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucSpets"]', data);
    return dataGrid.extract(SPECIALITY_SCHEMA);
  }

  async fetchById(id: number, academyId: string) {
    const specialities = await this.fetch(academyId, {
      id,
      f: DictionaryFilter.Speciality,
    });
    return specialities.pop();
  }

  fetchByFacultyId(facultyId: number, academyId: string) {
    return this.fetch(academyId, {
      f: DictionaryFilter.Faculty,
      id: facultyId,
    });
  }

  fetchAll(academyId: string) {
    return this.fetch(academyId);
  }
}
