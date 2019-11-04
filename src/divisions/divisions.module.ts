import { Module } from '@nestjs/common';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';

@Module({
  providers: [DivisionsService],
  controllers: [DivisionsController],
})
export class DivisionsModule {}
