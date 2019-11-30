import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Headers, MimeTypes } from 'http-headers-js';
import { AcademiesService } from '../../academies/services/academies.service';
import { transformRequest } from '../helpers/transform-request.helper';
import { transformResponse } from '../helpers/transform-response.helper';
import { requestInterceptor } from '../interceptors/request.interceptor';
import { responseInterceptor } from '../interceptors/response.interceptor';
import { SourcesService } from './sources.service';

@Injectable()
export class GrabberService {
  constructor(
    private readonly academiesService: AcademiesService,
    private readonly sourcesService: SourcesService,
  ) {}

  async create(academyId: string, sourceId?: string) {
    const academy = await this.academiesService.findById(academyId);

    const clientConfig: AxiosRequestConfig = {
      baseURL: academy.endpoint,
      responseType: 'arraybuffer',
      transformRequest,
      transformResponse,
      headers: {
        [Headers.CONTENT_TYPE]: MimeTypes.Application.X.WWW_FORM_URLENCODED,
      },
    };

    if (!!sourceId) {
      const { path } = await this.sourcesService.findById(sourceId);
      clientConfig.baseURL = `${clientConfig.baseURL}${path}`;
    }

    const client = axios.create(clientConfig);
    client.interceptors.request.use(...requestInterceptor(academy));
    client.interceptors.response.use(...responseInterceptor);
    return client;
  }
}
