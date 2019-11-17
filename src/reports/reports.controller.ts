import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListFacultyReportsRequest } from './interfaces/requests/list-faculty-reports-request.interface';
import { ReportsService } from './reports.service';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @GrpcMethod('ReportService', 'ListFacultyReports')
  async findByFacultyId({
    academyId,
    facultyId,
    years,
  }: ListFacultyReportsRequest) {
    const reports = await this.reportsService.fetchByFacultyId(
      facultyId,
      years,
      academyId,
    );
    return { data: reports };
  }
}
