import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListSpecialityGroupsRequest extends EntityRequest {
  specialityId: number;
}
