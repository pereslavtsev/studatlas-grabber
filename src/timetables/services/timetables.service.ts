import { Injectable } from '@nestjs/common';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb, op } from '../../grabber/utils/ui.util';
import { TimetablesMode } from '../enums/timetables-mode.enum';
import { ListDivisionTimetablesRequest } from '../interfaces/requests/list-division-timetables-request.interface';
import { ListFacultyTimetablesRequest } from '../interfaces/requests/list-faculty-timetables-request.interface';
import { ListRoomTimetablesRequest } from '../interfaces/requests/list-room-timetables-request.interface';

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

  async fetchByFacultyId({ academyId, facultyId, semester, years }: ListFacultyTimetablesRequest) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      [op('View')]: TimetablesMode.Groups,
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
  }

  async fetchByDivisionId({
    academyId,
    divisionId,
    semester,
    years,
  }: ListDivisionTimetablesRequest) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      [op('View')]: TimetablesMode.Teachers,
      [cmb('Kaf')]: divisionId,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
  }

  async fetchByRoom({ academyId, semester, years }: ListRoomTimetablesRequest) {
    const client = await this.createClient(academyId);
    const { data } = await client.request({
      [op('View')]: TimetablesMode.Rooms,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
  }
}
