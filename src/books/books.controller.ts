import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListBookEntriesRequest } from './interfaces/requests/list-book-entries-request.interface';
import { ListGroupBooksRequest } from './interfaces/requests/list-group-books-request.interface';
import { bookSerializer } from './serializers/book.serializer';
import { entrySerializer } from './serializers/entry.serializer';
import { BooksService } from './services/books.service';
import { EntriesService } from './services/entries.service';

@Controller()
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly entriesService: EntriesService,
  ) {}

  @GrpcMethod('BookService', 'ListGroupBooks')
  async findByGroupId({ groupId, academyId }: ListGroupBooksRequest) {
    const books = await this.booksService.fetchByGroupId(groupId, academyId);
    // TODO: relations
    return bookSerializer.serialize(books);
  }

  @GrpcMethod('BookService', 'ListBookEntries')
  async findEntries({ id, semester, academyId }: ListBookEntriesRequest) {
    const entries = await this.entriesService.fetchByBookId(
      id,
      semester,
      academyId,
    );
    // TODO: relations
    return entrySerializer.serialize(entries);
  }
}
