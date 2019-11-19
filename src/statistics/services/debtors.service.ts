import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb, op } from '../../grabber/utils/ui.util';
import { GroupDebtorsStatistics } from '../interfaces/group-debtors-statistics.interface';
import { ListGroupsDebtorsStatisticsRequest } from '../interfaces/requests/list-groups-debtors-statistics-request.interface';
import { GROUP_DEBTORS_STATISTICS_SCHEMA } from '../mocks/group-debtors-statistics-schema.mock';

@Injectable()
export class DebtorsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  async fetchByGroups({
    academyId,
    facultyId,
    years,
    semester,
  }: ListGroupsDebtorsStatisticsRequest): Promise<GroupDebtorsStatistics[]> {
    const debtStatSource = await this.sourcesService.findById(
      'debtors_statistics',
    );
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post(debtStatSource.path, {
      [op('View')]: 'Group',
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });

    const dataGrid = new DataGrid('table[id*="GrouspDepts"]', data);
    return dataGrid.extract(GROUP_DEBTORS_STATISTICS_SCHEMA);
  }
}
