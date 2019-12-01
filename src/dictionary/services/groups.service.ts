import { Injectable } from '@nestjs/common';
// import * as cheerio from 'cheerio';
import { GrabberService } from '../../grabber/services/grabber.service';
// import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { DataResponse } from '../../shared/interfaces/data-response.interface';
import { GetGroupDto } from '../dto/get-group.dto';
import { ListFacultyGroupsDto } from '../dto/list-faculty-groups.dto';
import { ListGroupsDto } from '../dto/list-groups.dto';
import { ListSpecialityGroupsDto } from '../dto/list-speciality-groups-request.interface';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Group } from '../interfaces/group.interface';
import { GROUP_SCHEMA } from '../mocks/group-schema.mock';

@Injectable()
export class GroupsService {
  constructor(private readonly grabberService: GrabberService) {}

  protected async fetch(
    { academyId, page }: ListGroupsDto,
    params?: any,
  ): Promise<DataResponse<Group>> {
    return this.grabberService.extractFormDataGrid({
      academyId,
      sourceId: 'dictionary',
      requestConfig: {
        method: 'post',
        params: {
          mode: DictionaryFilter.Group,
          ...params,
        },
      },
      page,
      name: 'ucGroups',
      schema: GROUP_SCHEMA,
    });

    // if (params && !!params.f) {
    //   const $ = cheerio.load(data);
    //   const pageTitle = $('.SubHead').text();
    //
    //   if (pageTitle.length) {
    //     switch (params.f) {
    //       case DictionaryFilter.Faculty: {
    //         // Проверяет, есть ли такой факультет
    //         const isFacultyExists = !!pageTitle.match('Группы факультета \\D+');
    //         if (!isFacultyExists) {
    //           throw new GrpcNotFoundException('Faculty is not found');
    //         }
    //         break;
    //       }
    //       case DictionaryFilter.Speciality: {
    //         // Проверяет, есть ли такая специальность
    //         const isSpecialityExists = !!pageTitle.match('Группы специальности \\S+');
    //         if (!isSpecialityExists) {
    //           throw new GrpcNotFoundException('Speciality is not found');
    //         }
    //         break;
    //       }
    //     }
    //   }
    // }
  }

  fetchById({ id, ...params }: GetGroupDto) {
    return this.fetch(params, {
      id,
      f: DictionaryFilter.Group,
    });
  }

  fetchByFacultyId({ facultyId, ...params }: ListFacultyGroupsDto) {
    return this.fetch(params, {
      id: facultyId,
      f: DictionaryFilter.Faculty,
    });
  }

  fetchBySpecialityId({ specialityId, ...params }: ListSpecialityGroupsDto) {
    return this.fetch(params, {
      id: specialityId,
      f: DictionaryFilter.Speciality,
    });
  }

  fetchAll(listGroupsDto: ListGroupsDto) {
    return this.fetch(listGroupsDto);
  }
}
