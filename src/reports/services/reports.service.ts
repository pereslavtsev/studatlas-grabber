import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb } from '../../grabber/utils/ui.util';
import { GetGroupReportDto } from '../dto/get-group-report.dto';
import { REPORT_SCHEMA } from '../mocks/report-schema.mock';
import { parseReport } from '../utils/parse-report.util';

@Injectable()
export class ReportsService {
  constructor(private readonly grabberService: GrabberService) {}

  async fetchByGroupId({ academyId, groupId, semester }: GetGroupReportDto) {
    const client = await this.grabberService.create(academyId, 'report');
    const { data } = await client.request({
      method: 'post',
      data: {
        [cmb('cmbSem')]: semester,
      },
      params: {
        group: groupId,
      },
    });
    return parseReport(data);
  }

  private async fetch(academyId: string, facultyId: number, years: string) {
    const client = await this.grabberService.create(academyId, 'reports');
    const { data } = await client.request({
      method: 'post',
      data: { [cmb('Facultets')]: facultyId, [cmb('Years')]: years },
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
