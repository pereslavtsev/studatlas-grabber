import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListFacultySchedulesRequest } from '../interfaces/requests/list-faculty-schedules-request.interface';
import { SchedulesService } from '../services/schedules.service';

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @GrpcMethod('ScheduleService', 'ListFacultySchedules')
  async findByFacultyId({ academyId, facultyId, years, semester }: ListFacultySchedulesRequest) {
    const schedules = await this.schedulesService.fetchByFacultyId({
      academyId,
      facultyId,
      years,
      semester,
    });
    return { data: schedules };
  }
}
