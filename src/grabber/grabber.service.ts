import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { AcademiesService } from '../academies/academies.service';
import { transformRequest } from './interceptors/transform-request.interceptor';
import { transformResponse } from './interceptors/transform-response.interceptor';

@Injectable()
export class GrabberService {
  constructor(private readonly academiesService: AcademiesService) {}

  static DIRECTORY_PATH = '/Dek/Default.aspx';

  async create(academyId: string) {
    const academy = await this.academiesService.findById(academyId);
    const config: AxiosRequestConfig = {
      baseURL: academy.endpoint,
      responseType: 'arraybuffer',
      transformRequest,
      transformResponse,
    };
    // tslint:disable-next-line:no-console
    console.log(config);
    return axios.create(config);
  }
}
