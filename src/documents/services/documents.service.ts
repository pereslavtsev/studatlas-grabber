import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb } from '../../grabber/utils/ui.util';
import { DocumentDetails } from '../classes/document-details.class';
import { ListGroupDocumentsDto } from '../dto/list-group-documents.dto';
import { GroupDocumentItem } from '../interfaces/group-document-item.interface';
import { GROUP_DOCUMENT_ITEM_SCHEMA } from '../mocks/group-document-item-schema.mock';

@Injectable()
export class DocumentsService {
  constructor(private readonly grabberService: GrabberService) {}

  async fetchByGroupId({
    academyId,
    facultyId,
    groupId,
    years,
    semester,
  }: ListGroupDocumentsDto): Promise<GroupDocumentItem[]> {
    const client = await this.grabberService.create(academyId, 'documents');
    const { data } = await client.request({
      method: 'post',
      data: {
        [cmb('Facultet')]: facultyId,
        [cmb('Group')]: groupId,
        [cmb('Year')]: years,
        [cmb('Sem')]: semester,
      },
    });
    const dataGrid = new DataGrid('table[id*="GridGroup"]', data);
    return dataGrid.extract(GROUP_DOCUMENT_ITEM_SCHEMA);
  }

  private async fetchOne(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId, 'document');
    const { data } = await client.request({
      params,
    });
    return new DocumentDetails(data).extractAll();
  }

  fetchById(id: number, academyId: string) {
    return this.fetchOne(academyId, { id });
  }
}
