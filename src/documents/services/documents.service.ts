import { Injectable } from '@nestjs/common';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { DocumentDetails } from '../classes/document-details.class';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

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
