import { AxiosRequestConfig } from 'axios';
import { transformRequest } from '../helpers/transform-request.helper';
import { transformResponse } from '../helpers/transform-response.helper';
import { DEFAULT_HEADERS } from '../mocks/default-headers.mock';

export const createBaseConfig = (baseURL: string): AxiosRequestConfig => ({
  baseURL,
  responseType: 'arraybuffer',
  transformRequest,
  transformResponse,
  headers: DEFAULT_HEADERS,
});
