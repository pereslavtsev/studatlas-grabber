import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListStatisticsDto } from '../dto/list-statistics.dto';
import { StatisticsService } from '../services/statistics.service';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @GrpcMethod('StatisticsService', 'ListDivisionsStatistics')
  @UsePipes(new ValidationPipe())
  async findByDivisions({ academyId, years, semester }: ListStatisticsDto) {
    const statistics = await this.statisticsService.fetchByDivisions({
      years,
      semester,
      academyId,
    });
    return { data: statistics };
  }

  @GrpcMethod('StatisticsService', 'ListFacultiesStatistics')
  @UsePipes(new ValidationPipe())
  async findByFaculties({ academyId, years, semester }: ListStatisticsDto) {
    const statistics = await this.statisticsService.fetchByFaculties({
      years,
      semester,
      academyId,
    });
    return { data: statistics };
  }
}
