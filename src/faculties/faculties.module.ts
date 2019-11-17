import { Module } from '@nestjs/common';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';

@Module({
  providers: [FacultiesService],
  exports: [FacultiesService],
  controllers: [FacultiesController],
})
export class FacultiesModule {}
