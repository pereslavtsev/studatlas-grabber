import { Module } from '@nestjs/common';
import { SchedulesController } from './controllers/schedules.controller';
import { SchedulesService } from './services/schedules.service';

@Module({
  providers: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
