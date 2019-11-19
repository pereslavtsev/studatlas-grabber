import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface GetGroupRequest extends EntityRequest {
  id: number;
}
