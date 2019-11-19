import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { SOURCES } from '../../grabber/mocks/sources.mock';
import { GrabberService } from '../../grabber/services/grabber.service';
import { GroupDebtorsStatistics } from '../interfaces/group-debtors-statistics.interface';
import {
  ListGroupsDebtorsStatisticsRequest,
} from '../interfaces/requests/list-groups-debtors-statistics-request.interface';
import { GROUP_DEBTORS_STATISTICS_SCHEMA } from '../mocks/group-debtors-statistics-schema.mock';

@Injectable()
export class DebtorsService {
  constructor(private readonly grabberService: GrabberService) {}

  async fetchByGroups({
    academyId,
    facultyId,
    years,
    semester,
  }: ListGroupsDebtorsStatisticsRequest): Promise<GroupDebtorsStatistics[]> {
    const debtStatSource = SOURCES.find(
      source => source.id === 'debtors_statistics',
    );
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post(debtStatSource.path, {
      opView: 'Group',
      cmbFacultets: facultyId,
      cmbYears: years,
      cmbSem: semester,
    });

    const dataGrid = new DataGrid('table[id*="GrouspDepts"]', data);
    return dataGrid.extract(GROUP_DEBTORS_STATISTICS_SCHEMA);
  }
}
