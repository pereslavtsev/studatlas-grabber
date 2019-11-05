import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';

@Module({
  providers: [SpecialitiesService],
  controllers: [SpecialitiesController]
})
export class SpecialitiesModule {}
