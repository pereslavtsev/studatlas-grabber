import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetGroupReportDto } from '../dto/get-group-report.dto';
import { ListFacultyReportsDto } from '../dto/list-faculty-reports.dto';
import { ReportsService } from '../services/reports.service';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @GrpcMethod('ReportService', 'GetGroupReport')
  @UsePipes(new ValidationPipe())
  async findByGroupId({ academyId, groupId, semester }: GetGroupReportDto) {
    const report = await this.reportsService.fetchByGroupId({
      academyId,
      groupId,
      semester,
    });
    return { data: [report] };
  }

  @GrpcMethod('ReportService', 'ListFacultyReports')
  @UsePipes(new ValidationPipe())
  async findByFacultyId({ academyId, facultyId, years }: ListFacultyReportsDto) {
    const reports = await this.reportsService.fetchByFacultyId(facultyId, years, academyId);
    return { data: reports };
  }
}
