import { AxiosRequestConfig } from 'axios';
import { Schema } from './schema.interface';

export interface ExtractFromDataGridConfig {
  academyId: string;
  sourceId: string;
  name: string;
  requestConfig?: AxiosRequestConfig;
  schema: Schema;
  page?: number;
}
