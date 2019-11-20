import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListGroupsDebtorsStatisticsRequest } from '../interfaces/requests/list-groups-debtors-statistics-request.interface';
import { ListTeachersDebtorsStatisticsRequest } from '../interfaces/requests/list-teachers-debtors-statistics-request.interface';
import { DebtorsService } from '../services/debtors.service';
import { StatisticsService } from '../services/statistics.service';

@Controller()
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @GrpcMethod('StatisticsService', 'ListGroupsDebtors')
  async findByGroups({
    academyId,
    years,
    semester,
    facultyId,
  }: ListGroupsDebtorsStatisticsRequest) {
    const statistics = await this.debtorsService.fetchByGroups({
      academyId,
      years,
      semester,
      facultyId,
    });
    return { data: statistics };
  }

  @GrpcMethod('StatisticsService', 'ListTeachersDebtors')
  async findByTeachers({
    academyId,
    years,
    semester,
    facultyId,
    divisionId,
  }: ListTeachersDebtorsStatisticsRequest) {
    const statistics = await this.debtorsService.fetchByTeachers({
      academyId,
      years,
      semester,
      facultyId,
      divisionId,
    });
    return { data: statistics };
  }
}
