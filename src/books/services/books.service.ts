import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { Book } from '../interfaces/book.interface';
import { BOOK_SCHEMA } from '../mocks/book-schema.mock';

@Injectable()
export class BooksService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get(GrabberService.DIRECTORY_PATH, {
      params: {
        mode: 'stud',
        ...params,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucStud"]', data);
    return dataGrid.extract(BOOK_SCHEMA);
  }

  async fetchById(id: number, academyId: string): Promise<Book> {
    const books = await this.fetch(academyId, { id, f: 'stud' });
    return books.pop();
  }

  async fetchByGroupId(groupId: number, academyId: string): Promise<Book[]> {
    const books = await this.fetch(academyId, { id: groupId, f: 'group' });
    return books.map(book => ({ ...book, groupId }));
  }
}
