import { Injectable } from '@nestjs/common';
import { GrabberService } from '../../grabber/services/grabber.service';
import { DocumentDetails } from '../classes/document-details.class';

@Injectable()
export class DocumentsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get('/Ved/Ved.aspx', {
      params,
    });
    return new DocumentDetails(data).extractAll();
  }

  fetchById(id: number, academyId: string) {
    return this.fetch(academyId, { id });
  }
}
