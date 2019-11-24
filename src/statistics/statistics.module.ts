import { Module } from '@nestjs/common';
import { DebtorsController } from './controllers/debtors.controller';
import { StatisticsController } from './controllers/statistics.controller';
import { DebtorsService } from './services/debtors.service';
import { StatisticsService } from './services/statistics.service';

@Module({
  providers: [StatisticsService, DebtorsService],
  controllers: [StatisticsController, DebtorsController],
  exports: [StatisticsService, DebtorsService],
})
export class StatisticsModule {}
