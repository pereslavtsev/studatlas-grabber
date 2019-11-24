import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListFacultySchedulesDto } from '../dto/list-faculty-schedules.dto';
import { SchedulesService } from '../services/schedules.service';

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @GrpcMethod('ScheduleService', 'ListFacultySchedules')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ academyId, facultyId, years, semester }: ListFacultySchedulesDto) {
    const schedules = await this.schedulesService.fetchByFacultyId({
      academyId,
      facultyId,
      years,
      semester,
    });
    return { data: schedules };
  }
}
