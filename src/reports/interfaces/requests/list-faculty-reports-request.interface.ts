import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListFacultyReportsRequest extends EntityRequest {
  facultyId: number;
  years: string;
}
