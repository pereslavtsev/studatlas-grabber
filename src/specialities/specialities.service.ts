import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { DictionaryFilter } from '../grabber/interfaces/dictionary-filter.enum';
import { GrabberService } from '../grabber/services/grabber.service';
import { SPECIALITY_SCHEMA } from './mocks/speciality-schema.mock';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(GrabberService.DIRECTORY_PATH, {
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
