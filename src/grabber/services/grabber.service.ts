import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AcademyVersion } from '../../academies/enums/academy-version.enum';
import { AcademiesService } from '../../academies/services/academies.service';
import { DataGrid } from '../classes/data-grid.class';
import { CALLBACK_ID, CALLBACK_PARAM } from '../constants/params.constants';
import { requestInterceptor } from '../interceptors/request.interceptor';
import { responseInterceptor } from '../interceptors/response.interceptor';
import { ExtractFromDataGridConfig } from '../interfaces/extract-from-data-grid-config.interface';
import { createBaseConfig } from '../utils/create-base-config.util';
import { SourcesService } from './sources.service';

@Injectable()
export class GrabberService {
  constructor(
    private readonly academiesService: AcademiesService,
    private readonly sourcesService: SourcesService,
  ) {}

  async create(academyId: string, sourceId?: string) {
    const academy = await this.academiesService.findById(academyId);
    const clientConfig = createBaseConfig(academy.endpoint);

    if (!!sourceId) {
      const { path } = await this.sourcesService.findById(sourceId);
      clientConfig.baseURL = `${clientConfig.baseURL}${path}`;
    }

    const client = axios.create(clientConfig);
    client.interceptors.request.use(...requestInterceptor(academy));
    client.interceptors.response.use(...responseInterceptor);
    return client;
  }

  async extractFormDataGrid({
    academyId,
    sourceId,
    requestConfig = {},
    schema,
    name,
    page = 1,
  }: ExtractFromDataGridConfig) {
    const client = await this.create(academyId, sourceId);
    const academy = await this.academiesService.findById(academyId);

    let config;

    switch (academy.version) {
      case AcademyVersion.Classic: {
        config = requestConfig;
        break;
      }
      case AcademyVersion.Modern:
      default: {
        config =
          page > 1
            ? {
                ...requestConfig,
                data: {
                  ...requestConfig.data,
                  [CALLBACK_ID]: name,
                  [CALLBACK_PARAM]: `c0:KV|2;[];GB|20;12|PAGERONCLICK3|PN${page - 1};`,
                },
              }
            : requestConfig;
      }
    }

    const { data } = await client.request(config);
    const dataGrid = new DataGrid(`table[id*="${name}"]`, data);
    return dataGrid.extract(schema);
  }
}
