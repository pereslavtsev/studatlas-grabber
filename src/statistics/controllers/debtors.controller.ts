import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListGroupDebtorsStatisticsRequest } from '../interfaces/requests/list-teacher-debtors-statistics-request.interface';
import { DebtorsService } from '../services/debtors.service';
import { StatisticsService } from '../services/statistics.service';

@Controller()
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @GrpcMethod('StatisticsService', 'ListGroupsDebtors')
  async findByDivisions({
    academyId,
    years,
    semester,
    facultyId,
  }: ListGroupDebtorsStatisticsRequest) {
    const statistics = await this.debtorsService.fetchByGroups({
      academyId,
      years,
      semester,
      facultyId,
    });
    return { data: statistics };
  }
}
