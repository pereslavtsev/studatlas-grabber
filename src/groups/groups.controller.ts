import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { GroupsService } from './groups.service';
import { GetGroupRequest } from './interfaces/requests/get-group-request.interface';
import { ListFacultyGroupsRequest } from './interfaces/requests/list-faculty-groups-request.interface';
import { ListGroupsRequest } from './interfaces/requests/list-groups-request.interface';
import { ListSpecialityGroupsRequest } from './interfaces/requests/list-speciality-groups-request.interface';
import { groupSerializer } from './serializers/group.serializer';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @GrpcMethod('GroupService', 'GetGroup')
  async findOne({ id, academyId }: GetGroupRequest) {
    const group = await this.groupsService.fetchById(id, academyId);
    if (!group) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Group is not found',
      });
    }
    return groupSerializer.serialize([group]);
  }

  @GrpcMethod('GroupService', 'ListFacultyGroups')
  async findByFacultyId({ academyId, facultyId }: ListFacultyGroupsRequest) {
    const groups = await this.groupsService.fetchByFacultyId(
      facultyId,
      academyId,
    );
    return groupSerializer.serialize(groups);
  }

  @GrpcMethod('GroupService', 'ListSpecialityGroups')
  async findBySpecialityId({
    academyId,
    specialityId,
  }: ListSpecialityGroupsRequest) {
    const groups = await this.groupsService.fetchBySpecialityId(
      specialityId,
      academyId,
    );
    return groupSerializer.serialize(groups);
  }

  @GrpcMethod('GroupService', 'ListGroups')
  async findAll({ academyId }: ListGroupsRequest) {
    const groups = await this.groupsService.fetchAll(academyId);
    return groupSerializer.serialize(groups);
  }
}
