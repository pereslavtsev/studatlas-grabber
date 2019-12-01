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
  async findOne(getGroupDto: GetGroupDto) {
    const response = await this.groupsService.fetchById(getGroupDto);
    if (!response.data.length) {
      throw new GrpcNotFoundException('Group is not found');
    }
    return response;
  }

  @GrpcMethod('GroupService', 'ListFacultyGroups')
  @UsePipes(new ValidationPipe())
  findByFacultyId(listFacultyGroupsDto: ListFacultyGroupsDto) {
    return this.groupsService.fetchByFacultyId(listFacultyGroupsDto);
  }

  @GrpcMethod('GroupService', 'ListSpecialityGroups')
  @UsePipes(new ValidationPipe())
  findBySpecialityId(listSpecialityGroupsDto: ListSpecialityGroupsDto) {
    return this.groupsService.fetchBySpecialityId(listSpecialityGroupsDto);
  }

  @GrpcMethod('GroupService', 'ListGroups')
  @UsePipes(new ValidationPipe())
  findAll(listGroupsDto: ListGroupsDto) {
    return this.groupsService.fetchAll(listGroupsDto);
  }
}
