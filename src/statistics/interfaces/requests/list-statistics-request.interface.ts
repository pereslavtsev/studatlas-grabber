import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListStatisticsRequest extends EntityRequest {
  years: string;
  semester: 0 | 1;
}
