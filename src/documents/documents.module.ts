import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './services/documents.service';
import { SaveStoriesService } from './services/save-stories.service';

@Module({
  providers: [DocumentsService, SaveStoriesService],
  controllers: [DocumentsController],
  exports: [DocumentsService, SaveStoriesService],
})
export class DocumentsModule {}
