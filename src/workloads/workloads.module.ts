import { Module } from '@nestjs/common';
import { WorkloadsController } from './controllers/workloads.controller';
import { WorkloadsService } from './services/workloads.service';

@Module({
  controllers: [WorkloadsController],
  providers: [WorkloadsService],
  exports: [WorkloadsService],
})
export class WorkloadsModule {}
