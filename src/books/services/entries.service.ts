import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { Entry } from '../interfaces/entry.interface';
import { ENTRY_SCHEMA } from '../mocks/entry-schema.mock';

@Injectable()
export class EntriesService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any): Promise<Entry[]> {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get('/Ved/ZachBooks.aspx', {
      params,
    });
    const dataGrid = new DataGrid('table[id*="ContentPage_Grid"]', data);
    return dataGrid.extract(ENTRY_SCHEMA);
  }

  fetchByBookId(
    id: number,
    semester: number,
    academyId: string,
  ): Promise<Entry[]> {
    return this.fetch(academyId, { id, sem: semester });
  }
}
