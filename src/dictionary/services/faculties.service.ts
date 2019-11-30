import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Faculty } from '../interfaces/faculty.interface';
import { FACULTY_SCHEMA } from '../mocks/faculty-schema.mock';

@Injectable()
export class FacultiesService {
  constructor(private readonly grabberService: GrabberService) {}

  protected async fetch(academyId: string, params?: any): Promise<Faculty[]> {
    const client = await this.grabberService.create(academyId, 'dictionary');
    const { data } = await client.request({
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
