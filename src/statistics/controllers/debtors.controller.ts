import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListGroupsDebtorsStatisticsRequest } from '../interfaces/requests/list-groups-debtors-statistics-request.interface';
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
}
