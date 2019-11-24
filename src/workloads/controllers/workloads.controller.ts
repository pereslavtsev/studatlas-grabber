import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListGroupsWorkloadsDto } from '../dto/list-groups-workloads.dto';
import { ListTeachersWorkloadsDto } from '../dto/list-teachers-workloads.dto';
import { WorkloadsService } from '../services/workloads.service';

@Controller()
export class WorkloadsController {
  constructor(private readonly workloadsService: WorkloadsService) {}

  @GrpcMethod('WorkloadService', 'ListGroupsWorkloads')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ academyId, facultyId, years }: ListGroupsWorkloadsDto) {
    const workloads = await this.workloadsService.fetchByFacultyId({
      academyId,
      facultyId,
      years,
    });
    return { data: workloads };
  }

  @GrpcMethod('WorkloadService', 'ListTeachersWorkloads')
  @UsePipes(new ValidationPipe())
  async findByDivisionId({ academyId, divisionId, years }: ListTeachersWorkloadsDto) {
    const workloads = await this.workloadsService.fetchByDivisionId({
      academyId,
      divisionId,
      years,
    });
    return { data: workloads };
  }
}
