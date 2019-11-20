import { GrabberService } from '../../grabber/services/grabber.service';
import { SourcesService } from '../../grabber/services/sources.service';

export abstract class AbstractDictionaryService {
  public constructor(
    private readonly grabberService: GrabberService,
    private readonly sourcesService: SourcesService,
  ) {}

  protected async createClient(academyId: string) {
    const source = await this.sourcesService.findById('dictionary');
    const client = await this.grabberService.create(academyId);
    client.defaults.url = source.path;
    return client;
  }
}
