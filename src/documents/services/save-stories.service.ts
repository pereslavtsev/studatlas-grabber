import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';
import { SaveStory } from '../interfaces/save-story.interface';
import { SAVE_STORY_SCHEMA } from '../mocks/save-story-schema.mock';

@Injectable()
export class SaveStoriesService {
  constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  private async fetch(academyId: string, params?: any): Promise<SaveStory[]> {
    const client = await this.grabberService.create(academyId);
    const source = await this.sourcesService.findById('save_stories');
    const { data } = await client.get(source.path, {
      params,
    });
    const dataGrid = new DataGrid('table[id*="ContentPage_Grid"]', data);
    return dataGrid.extract(SAVE_STORY_SCHEMA);
  }

  fetchStoriesByDocumentId(documentId: number, academyId: string) {
    return this.fetch(academyId, { id: documentId });
  }
}
