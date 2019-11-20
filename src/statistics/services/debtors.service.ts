import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb, op } from '../../grabber/utils/ui.util';
import { GroupDebtorsStatistics } from '../interfaces/group-debtors-statistics.interface';
import { ListGroupsDebtorsStatisticsRequest } from '../interfaces/requests/list-groups-debtors-statistics-request.interface';
import { ListTeachersDebtorsStatisticsRequest } from '../interfaces/requests/list-teachers-debtors-statistics-request.interface';
import { TeacherDebtorsStatistics } from '../interfaces/teacher-debtors-statistics.interface';
import { GROUP_DEBTORS_STATISTICS_SCHEMA } from '../mocks/group-debtors-statistics-schema.mock';
import { TEACHER_DEBTORS_STATISTICS_SCHEMA } from '../mocks/teacher-debtors-statistics-schema.mock';

@Injectable()
export class DebtorsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  private async createClient(academyId: string) {
    const debtStatSource = await this.sourcesService.findById('debtors_statistics');
    const client = await this.grabberService.create(academyId);
    client.defaults.url = debtStatSource.path;
    client.defaults.method = 'POST';
    return client;
  }

  async fetchByGroups({
    academyId,
    facultyId,
    years,
    semester,
  }: ListGroupsDebtorsStatisticsRequest): Promise<GroupDebtorsStatistics[]> {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      data: {
        [op('View')]: 'Group',
        [cmb('Facultets')]: facultyId,
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
    });

    const dataGrid = new DataGrid('table[id*="GrouspDepts"]', data);
    return dataGrid.extract(GROUP_DEBTORS_STATISTICS_SCHEMA);
  }

  async fetchByTeachers({
    academyId,
    facultyId,
    years,
    semester,
    divisionId,
  }: ListTeachersDebtorsStatisticsRequest): Promise<TeacherDebtorsStatistics[]> {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      data: {
        [op('View')]: 'Group',
        [cmb('Facultets')]: facultyId,
        [cmb('Kafs')]: divisionId || 0,
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
    });

    const dataGrid = new DataGrid('table[id*="KafsDepts"]', data);
    return dataGrid.extract(TEACHER_DEBTORS_STATISTICS_SCHEMA);
  }
}
