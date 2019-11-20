import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListDivisionTimetablesRequest extends EntityRequest {
  divisionId: number;
  years: string;
  semester: 1 | 2;
}
