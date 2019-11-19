import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb } from '../../grabber/utils/ui.util';
import { ListStatisticsRequest } from '../interfaces/requests/list-statistics-request.interface';
import { Statistics } from '../interfaces/statistics.interface';
import { STATISTICS_SCHEMA } from '../mocks/statistics-schema.mock';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  private async fetch(
    { academyId, years, semester }: ListStatisticsRequest,
    mode: string,
  ): Promise<Statistics[]> {
    const statisticsSource = await this.sourcesService.findById('statistics');
    const client = await this.grabberService.create(academyId);
    const { data } = await client.post(
      statisticsSource.path,
      {
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
      {
        params: {
          mode,
        },
      },
    );
    const dataGrid = new DataGrid('table[id*="ucStat"]', data);
    return dataGrid.extract(STATISTICS_SCHEMA);
  }

  protected fetchAll(
    { academyId, semester, years }: ListStatisticsRequest,
    mode: string,
  ) {
    let statMode;
    switch (mode) {
      case 'faculties':
        statMode = 'statfac';
        break;
      case 'divisions':
        statMode = 'statkaf';
        break;
    }
    return this.fetch({ academyId, semester, years }, statMode);
  }

  async fetchByDivisions({
    academyId,
    semester,
    years,
  }: ListStatisticsRequest) {
    return await this.fetchAll(
      {
        academyId,
        semester,
        years,
      },
      'divisions',
    );
  }

  async fetchByFaculties({
    academyId,
    semester,
    years,
  }: ListStatisticsRequest) {
    return this.fetchAll(
      {
        academyId,
        semester,
        years,
      },
      'faculties',
    );
  }
}
