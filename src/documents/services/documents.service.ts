import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { cmb } from '../../grabber/utils/ui.util';
import { DocumentDetails } from '../classes/document-details.class';
import { ListGroupDocumentsDto } from '../dto/list-group-documents.dto';
import { GroupDocumentItem } from '../interfaces/group-document-item.interface';
import { GROUP_DOCUMENT_ITEM_SCHEMA } from '../mocks/group-document-item-schema.mock';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  async fetchByGroupId({
    academyId,
    facultyId,
    groupId,
    years,
    semester,
  }: ListGroupDocumentsDto): Promise<GroupDocumentItem[]> {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('documents');
    const { data } = await client.post(source.path, {
      [cmb('Facultet')]: facultyId,
      [cmb('Group')]: groupId,
      [cmb('Year')]: years,
      [cmb('Sem')]: semester,
    });
    const dataGrid = new DataGrid('table[id*="GridGroup"]', data);
    return dataGrid.extract(GROUP_DOCUMENT_ITEM_SCHEMA);
  }

  private async fetchOne(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('document');
    const { data } = await client.get(source.path, {
      params,
    });
    return new DocumentDetails(data).extractAll();
  }

  fetchById(id: number, academyId: string) {
    return this.fetchOne(academyId, { id });
  }
}
