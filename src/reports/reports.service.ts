import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/services/grabber.service';
import { REPORT_SCHEMA } from './mocks/report-schema.mock';

@Injectable()
export class ReportsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post(
      '/Totals/Default.aspx',
      {
        cmbFacultets: '42',
        cmbYears: '2018-2019',
      },
      {},
    );
    console.log(data);
    const dataGrid = new DataGrid('table[id*="GridGroup"]', data);
    const entities = dataGrid.extract(REPORT_SCHEMA);
    // tslint:disable-next-line:no-console
    //console.log({ entities });
    return entities;
  }

  fetchByFacultyId(facultyId: number, academyId: string) {
    return this.fetch(academyId);
  }
}
