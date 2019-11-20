import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListTeachersDebtorsStatisticsRequest extends EntityRequest {
  facultyId?: number | undefined;
  divisionId?: number | undefined;
  years: string;
  semester: 1 | 2;
}
