import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb, op } from '../../grabber/utils/ui.util';
import { ListGroupsDebtorsStatisticsDto } from '../dto/list-groups-debtors-statistics.dto';
import { ListTeachersDebtorsStatisticsDto } from '../dto/list-teachers-debtors-statistics.dto';
import { GroupDebtorsStatistics } from '../interfaces/group-debtors-statistics.interface';
import { TeacherDebtorsStatistics } from '../interfaces/teacher-debtors-statistics.interface';
import { GROUP_DEBTORS_STATISTICS_SCHEMA } from '../mocks/group-debtors-statistics-schema.mock';
import { TEACHER_DEBTORS_STATISTICS_SCHEMA } from '../mocks/teacher-debtors-statistics-schema.mock';

@Injectable()
export class DebtorsService {
  constructor(private readonly grabberService: GrabberService) {}

  private createClient(academyId: string) {
    return this.grabberService.create(academyId, 'debtors_statistics');
  }

  async fetchByGroups({
    academyId,
    facultyId,
    years,
    semester,
  }: ListGroupsDebtorsStatisticsDto): Promise<GroupDebtorsStatistics[]> {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      method: 'post',
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
  }: ListTeachersDebtorsStatisticsDto): Promise<TeacherDebtorsStatistics[]> {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      method: 'post',
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
