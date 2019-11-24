import { Module } from '@nestjs/common';
import { TimetablesController } from './controllers/timetables.controller';
import { TimetablesService } from './services/timetables.service';

@Module({
  controllers: [TimetablesController],
  providers: [TimetablesService],
  exports: [TimetablesService],
})
export class TimetablesModule {}
