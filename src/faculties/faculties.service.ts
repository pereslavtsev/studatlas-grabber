import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { FACULTY_SCHEMA } from './mocks/faculty-schema.mock';

@Injectable()
export class FacultiesService {
  constructor(private readonly grabberService: GrabberService) {}

  static MODE = 'facultet';

  private async fetch(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(GrabberService.DIRECTORY_PATH, {
      params: {
        mode: FacultiesService.MODE,
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

  fetchAll(academyId: string) {
    return this.fetch(academyId);
  }
}
