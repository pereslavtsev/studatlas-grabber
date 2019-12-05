import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetGroupWorkloadDto } from '../dto/get-group-workload.dto';
import { ListGroupsWorkloadsDto } from '../dto/list-groups-workloads.dto';
import { ListTeachersWorkloadsDto } from '../dto/list-teachers-workloads.dto';
import { WorkloadsService } from '../services/workloads.service';

@Controller()
export class WorkloadsController {
  constructor(private readonly workloadsService: WorkloadsService) {}

  @GrpcMethod('WorkloadService', 'GetGroupWorkload')
  @UsePipes(new ValidationPipe())
  async findGroupById({ academyId, groupId, controlType, session }: GetGroupWorkloadDto) {
    const workload = await this.workloadsService.fetchByGroupId({
      academyId,
      groupId,
      controlType,
      session,
    });
    return { data: [workload] };
  }

  @GrpcMethod('WorkloadService', 'ListGroupsWorkloads')
  @UsePipes(new ValidationPipe())
  findByFacultyId(listGroupsWorkloadsDto: ListGroupsWorkloadsDto) {
    return this.workloadsService.fetchByFacultyId(listGroupsWorkloadsDto);
  }

  @GrpcMethod('WorkloadService', 'ListTeachersWorkloads')
  @UsePipes(new ValidationPipe())
  async findByDivisionId(listTeachersWorkloadsDto: ListTeachersWorkloadsDto) {
    return this.workloadsService.fetchByDivisionId(listTeachersWorkloadsDto);
  }
}
