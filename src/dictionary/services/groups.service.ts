import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as cheerio from 'cheerio';
import * as grpc from 'grpc';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { DictionaryFilter } from '../../grabber/interfaces/dictionary-filter.enum';
import { GrabberService } from '../../grabber/services/grabber.service';
import { GROUP_SCHEMA } from '../mocks/group-schema.mock';

@Injectable()
export class GroupsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(GrabberService.DIRECTORY_PATH, {
      params: {
        mode: 'group',
        ...params,
      },
    });

    if (params && !!params.f) {
      const $ = cheerio.load(data);
      const pageTitle = $('.SubHead').text();

      if (pageTitle.length) {
        switch (params.f) {
          case DictionaryFilter.Faculty: {
            // Проверяет, есть ли такой факультет
            const isFacultyExists = !!pageTitle.match('Группы факультета \\D+');
            if (!isFacultyExists) {
              throw new RpcException({
                status: grpc.status.NOT_FOUND,
                message: 'Faculty is not found',
              });
            }
            break;
          }
          case DictionaryFilter.Speciality: {
            // Проверяет, есть ли такая специальность
            const isSpecialityExists = !!pageTitle.match(
              'Группы специальности \\S+',
            );
            if (!isSpecialityExists) {
              throw new RpcException({
                status: grpc.status.NOT_FOUND,
                message: 'Speciality is not found',
              });
            }
            break;
          }
        }
      }
    }

    const dataGrid = new DataGrid('table[id*="ucGroups"]', data);
    const entities = dataGrid.extract(GROUP_SCHEMA);
    // tslint:disable-next-line:no-console
    console.log({ entities });
    return entities;
  }

  async fetchById(id: number, academyId: string) {
    const groups = await this.fetch(academyId, {
      id,
      f: DictionaryFilter.Group,
    });
    return groups.pop();
  }

  fetchByFacultyId(facultyId: number, academyId: string) {
    return this.fetch(academyId, {
      id: facultyId,
      f: DictionaryFilter.Faculty,
    });
  }

  fetchBySpecialityId(specialityId: number, academyId: string) {
    return this.fetch(academyId, {
      id: specialityId,
      f: DictionaryFilter.Speciality,
    });
  }

  fetchAll(academyId: string) {
    return this.fetch(academyId);
  }
}
