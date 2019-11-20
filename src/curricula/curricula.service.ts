import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/services/grabber.service';
import { SourcesService } from '../grabber/services/sources.service';
import { cmb } from '../grabber/utils/ui.util';
import { CurriculaItem } from './interfaces/curricula-item.interface';
import { ListFacultyCurricula } from './interfaces/requests/list-faculty-curricula.interface';
import { CURRICULA_SCHEMA } from './mocks/curricula-schema.mock';

@Injectable()
export class CurriculaService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  private async fetch({
    academyId,
    facultyId,
    years,
  }: ListFacultyCurricula): Promise<CurriculaItem[]> {
    const curriculaSource = await this.sourcesService.findById('curricula');
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post(curriculaSource.path, {
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
    });
    const dataGrid = new DataGrid('table[id*="Grid"]', data);
    return dataGrid.extract(CURRICULA_SCHEMA);
  }

  fetchByFaculty({ academyId, facultyId, years }: ListFacultyCurricula) {
    return this.fetch({ academyId, facultyId, years });
  }
}
