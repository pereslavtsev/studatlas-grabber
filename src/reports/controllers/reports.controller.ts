import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListFacultyReportsDto } from '../dto/list-faculty-reports.dto';
import { ReportsService } from '../services/reports.service';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @GrpcMethod('ReportService', 'ListFacultyReports')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({
    academyId,
    facultyId,
    years,
  }: ListFacultyReportsDto) {
    const reports = await this.reportsService.fetchByFacultyId(
      facultyId,
      years,
      academyId,
    );
    return { data: reports };
  }
}
