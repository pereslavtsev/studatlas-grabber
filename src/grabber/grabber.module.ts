import { Global, Module } from '@nestjs/common';
import { AcademiesModule } from '../academies/academies.module';
import { GrabberService } from './services/grabber.service';
import { SourcesService } from './services/sources.service';

@Global()
@Module({
  imports: [AcademiesModule],
  providers: [GrabberService, SourcesService],
  exports: [GrabberService, SourcesService],
})
export class GrabberModule {}
