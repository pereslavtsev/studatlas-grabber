import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { DataResponse } from '../../shared/interfaces/data-response.interface';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Speciality } from '../interfaces/speciality.interface';
import { SPECIALITY_SCHEMA } from '../mocks/speciality-schema.mock';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly grabberService: GrabberService) {}

  protected async fetch(academyId: string, params?: any): Promise<DataResponse<Speciality>> {
    const client = await this.grabberService.create(academyId, 'dictionary');
    const { data } = await client.request({
      method: 'post',
      data: {
        __CALLBACKPARAM: 'c0:KV|2;[];GB|20;12|PAGERONCLICK3|PN1',
      },
      params: {
        mode: DictionaryFilter.Speciality,
        ...params,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucSpets"]', data);
    const entries = dataGrid.extract(SPECIALITY_SCHEMA);
    const $ = cheerio.load(data);
    const pageInfo = $('.dxp-summary').text();
    const [page, allPages, total] = _.isString(pageInfo)
      ? // tslint:disable-next-line:radix
        pageInfo.match(/\d+/g).map(val => parseInt(val))
      : [1, 1, entries.length];

    return {
      data: entries,
      meta: {
        page: {
          page,
          allPages,
          limit: entries.length,
          total,
        },
      },
    };
  }

  async fetchById(id: number, academyId: string) {
    const specialities = await this.fetch(academyId, {
      id,
      f: DictionaryFilter.Speciality,
    });
    // @ts-ignore
    return specialities.pop();
  }

  fetchByFacultyId(facultyId: number, academyId: string) {
    return this.fetch(academyId, {
      f: DictionaryFilter.Faculty,
      id: facultyId,
    });
  }

  fetchAll(academyId: string) {
    return this.fetch(academyId);
  }
}
