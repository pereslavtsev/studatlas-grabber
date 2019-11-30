import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb } from '../../grabber/utils/ui.util';
import { GetGroupScheduleDto } from '../dto/get-group-schedule.dto';
import { ListFacultySchedulesDto } from '../dto/list-faculty-schedules.dto';
import { ScheduleItem } from '../interfaces/schedule-item.interface';
import { SCHEDULE_ITEM_SCHEMA } from '../mocks/schedule-item-schema.mock';
import { parseSchedule } from '../utils/parse-schedule.util';

@Injectable()
export class SchedulesService {
  constructor(private readonly grabberService: GrabberService) {}

  async fetchByGroupId({ academyId, groupId, semester }: GetGroupScheduleDto) {
    const client = await this.grabberService.create(academyId, 'schedule');
    const { data } = await client.request({
      params: {
        group: groupId,
        sem: semester,
      },
    });
    return parseSchedule(data);
  }

  private async fetch({
    academyId,
    facultyId,
    semester,
    years,
  }: ListFacultySchedulesDto): Promise<ScheduleItem[]> {
    const client = await this.grabberService.create(academyId, 'schedules');
    const { data } = await client.request({
      method: 'post',
      data: {
        [cmb('Facultets')]: facultyId,
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
    });
    const dataGrid = new DataGrid('table[id*="Grid"]', data);
    return dataGrid.extract(SCHEDULE_ITEM_SCHEMA);
  }

  fetchByFacultyId({ academyId, facultyId, semester, years }: ListFacultySchedulesDto) {
    return this.fetch({ academyId, facultyId, semester, years });
  }
}
