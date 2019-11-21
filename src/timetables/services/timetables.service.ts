import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb, op } from '../../grabber/utils/ui.util';
import { ListDivisionTimetablesDto } from '../dto/list-division-timetables.dto';
import { ListFacultyTimetablesDto } from '../dto/list-faculty-timetables.dto';
import { ListRoomTimetablesDto } from '../dto/list-room-timetables.dto';
import { TimetablesMode } from '../enums/timetables-mode.enum';
import { GROUP_TIMETABLE_ITEM_SCHEMA } from '../mocks/group-timetable-item-schema.mock';
import { ROOM_TIMETABLE_ITEM_SCHEMA } from '../mocks/room-timetable-item-schema.mock';
import { TEACHER_TIMETABLE_ITEM_SCHEMA } from '../mocks/teacher-timetable-item-schema.mock';

@Injectable()
export class TimetablesService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  private async createClient(academyId: string) {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('timetables');
    client.defaults.url = source.path;
    client.defaults.method = 'POST';
    return client;
  }

  async fetchByFacultyId({ academyId, facultyId, semester, years }: ListFacultyTimetablesDto) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      [op('View')]: TimetablesMode.Groups,
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
    const dataGrid = new DataGrid('table[id*="grGroup"]', data);
    return dataGrid.extract(GROUP_TIMETABLE_ITEM_SCHEMA);
  }

  async fetchByDivisionId({
    academyId,
    divisionId,
    semester,
    years,
  }: ListDivisionTimetablesDto) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      [op('View')]: TimetablesMode.Teachers,
      [cmb('Kaf')]: divisionId,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
    const dataGrid = new DataGrid('table[id*="grPrep"]', data);
    return dataGrid.extract(TEACHER_TIMETABLE_ITEM_SCHEMA);
  }

  async fetchByRoom({ academyId, semester, years }: ListRoomTimetablesDto) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      [op('View')]: TimetablesMode.Rooms,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
    const dataGrid = new DataGrid('table[id*="grAud"]', data);
    return dataGrid.extract(ROOM_TIMETABLE_ITEM_SCHEMA);
  }
}
