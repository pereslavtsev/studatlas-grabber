import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './services/books.service';
import { EntriesService } from './services/entries.service';

@Module({
  providers: [BooksService, EntriesService],
  controllers: [BooksController],
  exports: [BooksService, EntriesService],
})
export class BooksModule {}
