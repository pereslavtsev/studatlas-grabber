import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListBookEntriesDto } from './dto/list-book-entries.dto';
import { ListGroupBooksDto } from './dto/list-group-books.dto';
import { BooksService } from './services/books.service';
import { EntriesService } from './services/entries.service';

@Controller()
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly entriesService: EntriesService,
  ) {}

  @GrpcMethod('BookService', 'ListGroupBooks')
  @UsePipes(new ValidationPipe())
  async findByGroupId({ groupId, academyId }: ListGroupBooksDto) {
    const books = await this.booksService.fetchByGroupId(groupId, academyId);
    // TODO: relations
    return { data: books };
  }

  @GrpcMethod('BookService', 'ListBookEntries')
  @UsePipes(new ValidationPipe())
  async findEntries({ id, semester, academyId }: ListBookEntriesDto) {
    const entries = await this.entriesService.fetchByBookId(
      id,
      semester,
      academyId,
    );
    // TODO: relations
    return { data: entries };
  }
}
