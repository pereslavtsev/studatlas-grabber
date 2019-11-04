import { Global, Module } from '@nestjs/common';
import { AcademiesModule } from '../academies/academies.module';
import { GrabberService } from './grabber.service';

@Global()
@Module({
  imports: [AcademiesModule],
  providers: [GrabberService],
  exports: [GrabberService],
})
export class GrabberModule {}
