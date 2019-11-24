import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListGroupsDebtorsStatisticsDto } from '../dto/list-groups-debtors-statistics.dto';
import { ListTeachersDebtorsStatisticsDto } from '../dto/list-teachers-debtors-statistics.dto';
import { DebtorsService } from '../services/debtors.service';
import { StatisticsService } from '../services/statistics.service';

@Controller()
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @GrpcMethod('StatisticsService', 'ListGroupsDebtors')
  @UsePipes(new ValidationPipe())
  async findByGroups({
    academyId,
    years,
    semester,
    facultyId,
  }: ListGroupsDebtorsStatisticsDto) {
    const statistics = await this.debtorsService.fetchByGroups({
      academyId,
      years,
      semester,
      facultyId,
    });
    return { data: statistics };
  }

  @GrpcMethod('StatisticsService', 'ListTeachersDebtors')
  @UsePipes(new ValidationPipe())
  async findByTeachers({
    academyId,
    years,
    semester,
    facultyId,
    divisionId,
  }: ListTeachersDebtorsStatisticsDto) {
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
