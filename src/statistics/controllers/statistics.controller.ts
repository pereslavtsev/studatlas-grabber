import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListStatisticsRequest } from '../interfaces/requests/list-statistics-request.interface';
import { StatisticsService } from '../services/statistics.service';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @GrpcMethod('StatisticsService', 'ListDivisionsStatistics')
  async findByDivisions({ academyId, years, semester }: ListStatisticsRequest) {
    const statistics = await this.statisticsService.fetchByDivisions({
      years,
      semester,
      academyId,
    });
    return { data: statistics };
  }

  @GrpcMethod('StatisticsService', 'ListFacultiesStatistics')
  async findByFaculties({ academyId, years, semester }: ListStatisticsRequest) {
    const statistics = await this.statisticsService.fetchByFaculties({
      years,
      semester,
      academyId,
    });
    return { data: statistics };
  }
}
