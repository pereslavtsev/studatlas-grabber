import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListGroupsDebtorsStatisticsRequest extends EntityRequest {
  facultyId?: number | undefined;
  years: string;
  semester: 1 | 2;
}
