import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SOURCES } from '../grabber/mocks/sources.mock';
import { GrabberService } from '../grabber/services/grabber.service';
import { ListFacultyCurricula } from './interfaces/requests/list-faculty-curricula.interface';
import { CURRICULA_SCHEMA } from './mocks/curricula-schema.mock';

@Injectable()
export class CurriculaService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch({ academyId, facultyId, years }: ListFacultyCurricula) {
    const curriculaSource = SOURCES.find(source => source.id === 'curricula');
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post(curriculaSource.path, {
      cmbFacultets: facultyId,
      cmbYears: years,
    });
    const dataGrid = new DataGrid('table[id*="Grid"]', data);
    return dataGrid.extract(CURRICULA_SCHEMA);
  }

  fetchByFaculty({ academyId, facultyId, years }: ListFacultyCurricula) {
    return this.fetch({ academyId, facultyId, years });
  }
}
