import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Speciality } from '../interfaces/speciality.interface';
import { SPECIALITY_SCHEMA } from '../mocks/speciality-schema.mock';
import { AbstractDictionaryService } from './abstract-dictionary.service';

@Injectable()
export class SpecialitiesService extends AbstractDictionaryService {
  protected async fetch(academyId: string, params?: any): Promise<Speciality[]> {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
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
}
