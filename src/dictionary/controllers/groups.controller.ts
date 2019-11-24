import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from '../../shared/exceptions/grpc-not-found.exception';
import { GetGroupDto } from '../dto/get-group.dto';
import { ListFacultyGroupsDto } from '../dto/list-faculty-groups.dto';
import { ListGroupsDto } from '../dto/list-groups.dto';
import { ListSpecialityGroupsDto } from '../dto/list-speciality-groups-request.interface';
import { GroupsService } from '../services/groups.service';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @GrpcMethod('GroupService', 'GetGroup')
  @UsePipes(new ValidationPipe())
  async findOne({ id, academyId }: GetGroupDto) {
    const group = await this.groupsService.fetchById(id, academyId);
    if (!group) {
      throw new GrpcNotFoundException('Group is not found');
    }
    return { data: [group] };
  }

  @GrpcMethod('GroupService', 'ListFacultyGroups')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ academyId, facultyId }: ListFacultyGroupsDto) {
    const groups = await this.groupsService.fetchByFacultyId(facultyId, academyId);
    return { data: groups };
  }

  @GrpcMethod('GroupService', 'ListSpecialityGroups')
  @UsePipes(new ValidationPipe())
  async findBySpecialityId({ academyId, specialityId }: ListSpecialityGroupsDto) {
    const groups = await this.groupsService.fetchBySpecialityId(specialityId, academyId);
    return { data: groups };
  }

  @GrpcMethod('GroupService', 'ListGroups')
  @UsePipes(new ValidationPipe())
  async findAll({ academyId }: ListGroupsDto) {
    const groups = await this.groupsService.fetchAll(academyId);
    return { data: groups };
  }
}
