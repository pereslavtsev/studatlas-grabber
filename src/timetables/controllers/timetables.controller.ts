import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListDivisionTimetablesRequest } from '../interfaces/requests/list-division-timetables-request.interface';
import { ListFacultyTimetablesRequest } from '../interfaces/requests/list-faculty-timetables-request.interface';
import { ListRoomTimetablesRequest } from '../interfaces/requests/list-room-timetables-request.interface';
import { TimetablesService } from '../services/timetables.service';

@Controller()
export class TimetablesController {
  constructor(private readonly timetablesService: TimetablesService) {}

  @GrpcMethod('TimetableService', 'ListFacultyTimetables')
  async findByFacultyId({ academyId, facultyId, years, semester }: ListFacultyTimetablesRequest) {
    const timetables = await this.timetablesService.fetchByFacultyId({
      academyId,
      facultyId,
      years,
      semester,
    });
    return { data: timetables };
  }

  @GrpcMethod('TimetableService', 'ListDivisionTimetables')
  async findByDivisionId({
    academyId,
    divisionId,
    years,
    semester,
  }: ListDivisionTimetablesRequest) {
    const timetables = await this.timetablesService.fetchByDivisionId({
      academyId,
      divisionId,
      years,
      semester,
    });
    return { data: timetables };
  }

  @GrpcMethod('TimetableService', 'ListRoomTimetables')
  async findByRoom({ academyId, years, semester }: ListRoomTimetablesRequest) {
    const timetables = await this.timetablesService.fetchByRoom({
      academyId,
      years,
      semester,
    });
    return { data: timetables };
  }
}
