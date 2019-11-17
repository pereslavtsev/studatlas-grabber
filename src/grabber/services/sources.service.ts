import { Injectable } from '@nestjs/common';
import { SOURCES } from '../mocks/sources.mock';

@Injectable()
export class SourcesService {
  sources = SOURCES;

  findById(id: string) {
    return this.sources.find(source => source.id === id);
  }
}
