import { Injectable } from '@nestjs/common';
import { GrabberService } from '../../grabber/services/grabber.service';
import { DataResponse } from '../../shared/interfaces/data-response.interface';
import { GetDivisionDto } from '../dto/get-division.dto';
import { ListDivisionsDto } from '../dto/list-divisions.dto';
import { DictionaryFilter } from '../enums/dictionary-filter.enum';
import { Division } from '../interfaces/division.interface';
import { DIVISION_SCHEMA } from '../mocks/division-schema.mock';

@Injectable()
export class DivisionsService {
  constructor(private readonly grabberService: GrabberService) {}

  protected async fetch(
    { academyId, page }: ListDivisionsDto,
    params?: any,
  ): Promise<DataResponse<Division>> {
    return this.grabberService.extractFormDataGrid({
      academyId,
      schema: DIVISION_SCHEMA,
      requestConfig: {
        params: {
          mode: DictionaryFilter.Division,
          ...params,
        },
      },
      name: 'ucKaf',
      sourceId: 'dictionary',
      page,
    });
  }

  async fetchById({ id, ...params }: GetDivisionDto) {
    const { data, ...fields } = await this.fetch(params, {
      id,
      f: DictionaryFilter.Division,
    });
    return {
      ...fields,
      data: !data[0].id
        ? data.map((division: Division) => ({
            ...division,
            id,
          }))
        : data,
    };
  }

  async fetchAll(listDivisionsDto: ListDivisionsDto) {
    const { data, ...fields } = await this.fetch(listDivisionsDto);
    return {
      ...fields,
      data: !data[0].id
        ? data.map((division: Division, i: number) => ({
            ...division,
            id: i + 1,
          }))
        : data,
    };
  }
}
