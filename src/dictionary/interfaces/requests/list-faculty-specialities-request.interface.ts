import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListFacultySpecialitiesRequest extends EntityRequest {
  facultyId: number;
}
