import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListGroupBooksRequest extends EntityRequest {
  groupId: number;
}
