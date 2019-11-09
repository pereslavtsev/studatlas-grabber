import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListStatisticsRequest } from './interfaces/list-statistics-request.interface';
import { statisticsSerializer } from './serializers/statistics.serializer';
import { StatisticsService } from './statistics.service';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @GrpcMethod('StatisticsService', 'ListDivisionsStatistics')
  async findByDivisions({ academyId, year, semester }: ListStatisticsRequest) {
    const statistics = await this.statisticsService.fetchByDivisions(
      year,
      semester,
      academyId,
    );
    return statisticsSerializer.serialize(statistics);
  }

  @GrpcMethod('StatisticsService', 'ListFacultiesStatistics')
  async findByFaculties({ academyId, year, semester }: ListStatisticsRequest) {
    const statistics = await this.statisticsService.fetchByDivisions(
      year,
      semester,
      academyId,
    );
    return statisticsSerializer.serialize(statistics);
  }
}
