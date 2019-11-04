import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import * as _ from 'lodash';
import { GetFacultyRequest } from '../faculties/interfaces/get-faculty-request.interface';
import { GroupsService } from './groups.service';
import { GroupFilter } from './interfaces/group-filter.enum';
import { GroupOrder } from './interfaces/group-order.enum';
import { ListGroupsRequest } from './interfaces/list-groups-request.interface';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @GrpcMethod('GroupService', 'GetGroup')
  async findOne({ id, academy_id }: GetFacultyRequest) {
    const group = await this.groupsService.fetchById(id, academy_id);
    if (!group) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Group is not found',
      });
    }
    return group;
  }

  @GrpcMethod('GroupService', 'ListGroups')
  async findAll({
    order_by,
    academy_id,
    filter_by,
    related_id,
  }: ListGroupsRequest) {
    let groups;
    switch (filter_by) {
      case GroupFilter.Faculty: {
        groups = await this.groupsService.fetchByFacultyId(related_id, academy_id);
        break;
      }
      case GroupFilter.Speciality: {
        groups = await this.groupsService.fetchBySpecialityId(related_id, academy_id);
        break;
      }
      case GroupFilter.All:
      default: {
        groups = await this.groupsService.fetchAll(academy_id);
      }
    }

    if (order_by === GroupOrder.Default) {
      return { groups };
    }
    return {
      groups: _.sortBy(groups, [order_by.toLowerCase()]),
    };
  }
}
