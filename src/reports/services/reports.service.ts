import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb } from '../../grabber/utils/ui.util';
import { REPORT_SCHEMA } from '../mocks/report-schema.mock';

@Injectable()
export class ReportsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, facultyId: number, years: string) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post('/Totals/Default.aspx', {
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
    });
    console.log(data);
    const dataGrid = new DataGrid('table[id*="GridGroup"]', data);
    const entities = dataGrid.extract(REPORT_SCHEMA);
    // tslint:disable-next-line:no-console
    console.log({ entities });
    return entities;
  }

  fetchByFacultyId(facultyId: number, years: string, academyId: string) {
    return this.fetch(academyId, facultyId, years);
  }
}
