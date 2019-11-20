import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListFacultyTimetablesRequest extends EntityRequest {
  facultyId: number;
  years: string;
  semester: 1 | 2;
}
