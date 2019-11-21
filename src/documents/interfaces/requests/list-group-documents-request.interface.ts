import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListGroupDocumentsRequest extends EntityRequest {
  facultyId: number;
  groupId: number;
  years: string;
  semester: number;
}
