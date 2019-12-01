import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { AcademyVersion } from '../../academies/enums/academy-version.enum';
import { AcademiesService } from '../../academies/services/academies.service';
import { CustomLogger } from '../../shared/services/custom-logger.service';
import { DataGrid } from '../classes/data-grid.class';
import { CALLBACK_ID, CALLBACK_PARAM } from '../constants/params.constants';
import { DEFAULT_PAGE_LIMIT } from '../grabber.constants';
import { requestInterceptor } from '../interceptors/request.interceptor';
import { responseInterceptor } from '../interceptors/response.interceptor';
import { ExtractFromDataGridConfig } from '../interfaces/extract-from-data-grid-config.interface';
import { createBaseConfig } from '../utils/create-base-config.util';
import { SourcesService } from './sources.service';

@Injectable()
export class GrabberService {
  private readonly logger = new CustomLogger(GrabberService.name);

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
    client.interceptors.request.use(AxiosLogger.requestLogger);
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
        if (_.isEmpty(requestConfig.data) && page > 1) {
          config = { ...requestConfig, method: 'get' };
        }
        break;
      }
      case AcademyVersion.Modern:
      default: {
        config =
          page > 1
            ? {
                ...requestConfig,
                method: 'post',
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
    const entries = dataGrid.extract(schema);

    const DEFAULT_PAGE_INFO = [1, 1, entries.length];
    let currentPage;
    let allPages;
    let total;

    switch (academy.version) {
      case AcademyVersion.Classic: {
        [currentPage, allPages, total] = DEFAULT_PAGE_INFO;
        break;
      }
      case AcademyVersion.Modern:
      default: {
        const $ = cheerio.load(data);
        const pageInfo = $('.dxp-summary').text();
        [currentPage, allPages, total] = !_.isEmpty(pageInfo)
          ? // tslint:disable-next-line:radix
            pageInfo.match(/\d+/g).map(val => parseInt(val))
          : DEFAULT_PAGE_INFO;
      }
    }

    this.logger.table('Результат запроса:', schema, entries);

    return {
      data: entries,
      meta: {
        page: {
          page: currentPage,
          allPages,
          limit: entries.length > DEFAULT_PAGE_LIMIT ? entries.length : DEFAULT_PAGE_LIMIT,
          total,
        },
      },
    };
  }
}
