import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetGroupRequest } from '../interfaces/requests/get-group-request.interface';
import { ListFacultyGroupsRequest } from '../interfaces/requests/list-faculty-groups-request.interface';
import { ListGroupsRequest } from '../interfaces/requests/list-groups-request.interface';
import { ListSpecialityGroupsRequest } from '../interfaces/requests/list-speciality-groups-request.interface';
import { GroupsService } from '../services/groups.service';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @GrpcMethod('GroupService', 'GetGroup')
  async findOne({ id, academyId }: GetGroupRequest) {
    const group = await this.groupsService.fetchById(id, academyId);
    if (!group) {
      throw new GrpcNotFoundException('Group is not found');
    }
    return { data: [group] };
  }

  @GrpcMethod('GroupService', 'ListFacultyGroups')
  async findByFacultyId({ academyId, facultyId }: ListFacultyGroupsRequest) {
    const groups = await this.groupsService.fetchByFacultyId(
      facultyId,
      academyId,
    );
    return { data: groups };
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
    return { data: groups };
  }

  @GrpcMethod('GroupService', 'ListGroups')
  async findAll({ academyId }: ListGroupsRequest) {
    const groups = await this.groupsService.fetchAll(academyId);
    return { data: groups };
  }
}
