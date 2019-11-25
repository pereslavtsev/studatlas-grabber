import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { transformData } from '../../grabber/helpers/transform-data.helper';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { getInputPrefix } from '../../grabber/utils/get-input-prefix.util';
import { cmb, op } from '../../grabber/utils/ui.util';
import { GetGroupWorkloadDto } from '../dto/get-group-workload.dto';
import { ListGroupsWorkloadsDto } from '../dto/list-groups-workloads.dto';
import { ListTeachersWorkloadsDto } from '../dto/list-teachers-workloads.dto';
import { WorkloadsMode } from '../enums/timetables-mode.enum';
import { GROUP_WORKLOAD_ITEM_SCHEMA } from '../mocks/group-workload-item-schema.mock';
import { GROUP_WORKLOAD_SCHEMA } from '../mocks/group-workload-schema.mock';
import { TEACHER_WORKLOAD_ITEM_SCHEMA } from '../mocks/teacher-workload-item-schema.mock';

@Injectable()
export class WorkloadsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  async fetchByGroupId({ academyId, groupId, session, controlType }: GetGroupWorkloadDto) {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('workload');
    const { data } = await client.post(
      source.path,
      {
        [cmb('Contr')]: controlType,
        [cmb('Sem')]: session,
      },
      {
        params: {
          group: groupId,
        },
      },
    );
    const dataGrid = new DataGrid('table[id*="Grid"]', data);
    return dataGrid.extract(GROUP_WORKLOAD_SCHEMA).pop();
  }

  async fetchByFacultyId({ academyId, facultyId, years }: ListGroupsWorkloadsDto) {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('workloads');
    const { data } = await client.post(source.path, {
      [op('View')]: WorkloadsMode.Groups,
      [cmb('Facultets')]: facultyId,
      [cmb('Years')]: years,
    });
    const dataGrid = new DataGrid('table[id*="GridGroup"]', data);
    return dataGrid.extract(GROUP_WORKLOAD_ITEM_SCHEMA);
  }

  async fetchByDivisionId({ academyId, divisionId, years }: ListTeachersWorkloadsDto) {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('workloads');
    // этот запрос - только на получение view state и event validation
    const { data, config } = await client.post(source.path, {
      [op('View')]: WorkloadsMode.Teachers,
    });
    const oldData = JSON.parse(JSON.stringify(config.data));
    const transformedData = transformData(data, oldData);
    const prefix = getInputPrefix(
      {
        [op('View')]: WorkloadsMode.Teachers,
      },
      transformedData,
    );
    const response = await client.post(source.path, {
      ...transformedData,
      [`${prefix}${op('View')}`]: WorkloadsMode.Teachers,
      [`${prefix}${cmb('Kaf')}`]: divisionId, // то что надо
      [`${prefix}${cmb('Years')}`]: years,
    });
    const dataGrid = new DataGrid('table[id*="GridPrep"]', response.data);
    return dataGrid.extract(TEACHER_WORKLOAD_ITEM_SCHEMA);
  }
}
