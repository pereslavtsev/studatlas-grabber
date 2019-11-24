import { Injectable } from '@nestjs/common';
import { Source } from '../interfaces/source.interface';
import { SOURCES } from '../mocks/sources.mock';

@Injectable()
export class SourcesService {
  sources = SOURCES;

  findById(id: string): Promise<Source> {
    const result = this.sources.find(
      source => source.id.toLowerCase() === id.toLowerCase(),
    );
    return new Promise<Source>(resolve => {
      resolve(result);
    });
  }
}
