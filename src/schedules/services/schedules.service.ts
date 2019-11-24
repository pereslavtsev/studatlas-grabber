import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb } from '../../grabber/utils/ui.util';
import { ListFacultySchedulesDto } from '../dto/list-faculty-schedules.dto';
import { SCHEDULE_ITEM_SCHEMA } from '../mocks/schedule-item-schema.mock';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  private async fetch({ academyId, facultyId, semester, years }: ListFacultySchedulesDto) {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('schedules');
    const { data } = await client.post(source.path, {
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
      [cmb('Sem')]: semester,
    });
    const dataGrid = new DataGrid('table[id*="Grid"]', data);
    return dataGrid.extract(SCHEDULE_ITEM_SCHEMA);
  }

  fetchByFacultyId({ academyId, facultyId, semester, years }: ListFacultySchedulesDto) {
    return this.fetch({ academyId, facultyId, semester, years });
  }
}
