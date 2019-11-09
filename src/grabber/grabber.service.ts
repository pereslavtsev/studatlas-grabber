import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import axios, { AxiosRequestConfig } from 'axios';
import * as grpc from 'grpc';
import { AcademiesService } from '../academies/academies.service';
import { transformRequest } from './helpers/transform-request.helper';
import { transformResponse } from './helpers/transform-response.helper';

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
    };
    const client = axios.create(clientConfig);
    client.interceptors.request.use(
      config => {
        /** In dev, intercepts request and logs it into console for dev */
        // tslint:disable-next-line:no-console
        // console.info(config);
        return config;
      },
      error => {
        // tslint:disable-next-line:no-console
        // console.error(error);
        return Promise.reject(error);
      },
    );
    client.interceptors.response.use(response => {
      return response;
    }, error => {
      // tslint:disable-next-line:no-console
      console.log(error);
      throw new RpcException({
        status: grpc.status.UNKNOWN,
        message: 'Unknown error on a remote server',
      });
    });
    return client;
  }
}
