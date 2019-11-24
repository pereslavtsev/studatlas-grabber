import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListDivisionTimetablesDto } from '../dto/list-division-timetables.dto';
import { ListFacultyTimetablesDto } from '../dto/list-faculty-timetables.dto';
import { ListRoomTimetablesDto } from '../dto/list-room-timetables.dto';
import { TimetablesService } from '../services/timetables.service';

@Controller()
export class TimetablesController {
  constructor(private readonly timetablesService: TimetablesService) {}

  @GrpcMethod('TimetableService', 'ListFacultyTimetables')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ academyId, facultyId, years, semester }: ListFacultyTimetablesDto) {
    const timetables = await this.timetablesService.fetchByFacultyId({
      academyId,
      facultyId,
      years,
      semester,
    });
    return { data: timetables };
  }

  @GrpcMethod('TimetableService', 'ListDivisionTimetables')
  @UsePipes(new ValidationPipe())
  async findByDivisionId({
    academyId,
    divisionId,
    years,
    semester,
  }: ListDivisionTimetablesDto) {
    const timetables = await this.timetablesService.fetchByDivisionId({
      academyId,
      divisionId,
      years,
      semester,
    });
    return { data: timetables };
  }

  @GrpcMethod('TimetableService', 'ListRoomTimetables')
  @UsePipes(new ValidationPipe())
  async findByRoom({ academyId, years, semester }: ListRoomTimetablesDto) {
    const timetables = await this.timetablesService.fetchByRoom({
      academyId,
      years,
      semester,
    });
    return { data: timetables };
  }
}
