import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListFacultyGroupsRequest extends EntityRequest {
  facultyId: number;
}
