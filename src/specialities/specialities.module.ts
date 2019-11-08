import { Module } from '@nestjs/common';
import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesService } from './specialities.service';

@Module({
  providers: [SpecialitiesService],
  controllers: [SpecialitiesController],
})
export class SpecialitiesModule {}
