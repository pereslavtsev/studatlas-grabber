import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import axios, { AxiosRequestConfig } from 'axios';
import * as grpc from 'grpc';
import { AcademiesService } from '../../academies/academies.service';
import { transformRequest } from '../helpers/transform-request.helper';
import { transformResponse } from '../helpers/transform-response.helper';
import { requestInterceptor } from '../interceptors/request.interceptor';

@Injectable()
export class GrabberService {
  constructor(private readonly academiesService: AcademiesService) {}

  static DIRECTORY_PATH = '/Dek/Default.aspx';

  async create(academyId: string) {
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
    const client = axios.create(clientConfig);
    client.interceptors.request.use(...requestInterceptor);
    client.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // tslint:disable-next-line:no-console
        console.log(error);
        throw new RpcException({
          status: grpc.status.UNKNOWN,
          message: 'Unknown error on a remote server',
        });
      },
    );
    return client;
  }
}
