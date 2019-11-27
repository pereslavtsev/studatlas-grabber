import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb, op } from '../../grabber/utils/ui.util';
import { GetGroupTimetableDto } from '../dto/get-group-timetable.dto';
import { ListDivisionTimetablesDto } from '../dto/list-division-timetables.dto';
import { ListFacultyTimetablesDto } from '../dto/list-faculty-timetables.dto';
import { ListRoomTimetablesDto } from '../dto/list-room-timetables.dto';
import { TimetablesMode } from '../enums/timetables-mode.enum';
import { GROUP_TIMETABLE_ITEM_SCHEMA } from '../mocks/group-timetable-item-schema.mock';
import { ROOM_TIMETABLE_ITEM_SCHEMA } from '../mocks/room-timetable-item-schema.mock';
import { TEACHER_TIMETABLE_ITEM_SCHEMA } from '../mocks/teacher-timetable-item-schema.mock';
import { parseGroupTimetable } from '../utils/parse-group-timetable.util';

@Injectable()
export class TimetablesService {
  constructor(private readonly grabberService: GrabberService) {}

  async fetchByGroupId({ academyId, groupId, semester, mode, weekday }: GetGroupTimetableDto) {
    const client = await this.grabberService.create(academyId, 'timetable');
    const { data } = await client.request({
      method: 'post',
      params: {
        group: groupId,
        sem: semester,
      },
      data: {
        [cmb('DayOfWeek')]: weekday,
        [cmb('TypeView')]: mode,
      },
    });
    parseGroupTimetable(data);
  }

  private createClient(academyId: string) {
    return this.grabberService.create(academyId, 'timetables');
  }

  async fetchByFacultyId({ academyId, facultyId, semester, years }: ListFacultyTimetablesDto) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      method: 'post',
      data: {
        [op('View')]: TimetablesMode.Groups,
        [cmb('Facultets')]: facultyId,
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
    });
    const dataGrid = new DataGrid('table[id*="grGroup"]', data);
    return dataGrid.extract(GROUP_TIMETABLE_ITEM_SCHEMA);
  }

  async fetchByDivisionId({ academyId, divisionId, semester, years }: ListDivisionTimetablesDto) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      method: 'post',
      data: {
        [op('View')]: TimetablesMode.Teachers,
        [cmb('Kaf')]: divisionId,
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
    });
    const dataGrid = new DataGrid('table[id*="grPrep"]', data);
    return dataGrid.extract(TEACHER_TIMETABLE_ITEM_SCHEMA);
  }

  async fetchByRoom({ academyId, semester, years }: ListRoomTimetablesDto) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      method: 'post',
      data: {
        [op('View')]: TimetablesMode.Rooms,
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
    });
    const dataGrid = new DataGrid('table[id*="grAud"]', data);
    return dataGrid.extract(ROOM_TIMETABLE_ITEM_SCHEMA);
  }
}
