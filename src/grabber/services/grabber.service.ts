import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { AcademiesService } from '../../academies/services/academies.service';
import { GrpcUnknownException } from '../../shared/exceptions/grpc-unknown.exception';
import { transformRequest } from '../helpers/transform-request.helper';
import { transformResponse } from '../helpers/transform-response.helper';
import { requestInterceptor } from '../interceptors/request.interceptor';
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
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    if (!!sourceId) {
      const { path } = await this.sourcesService.findById(sourceId);
      clientConfig.url = path;
    }

    const client = axios.create(clientConfig);
    client.interceptors.request.use(...requestInterceptor(academy.disabledSources));
    client.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // tslint:disable-next-line:no-console
        console.log(error);
        throw new GrpcUnknownException('Unknown error on a remote server');
      },
    );
    return client;
  }
}
