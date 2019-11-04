import { Global, Module } from '@nestjs/common';
import { GrabberModule } from '../grabber/grabber.module';

@Global()
@Module({
  imports: [GrabberModule],
})
export class SharedModule {}
