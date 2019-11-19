import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListBookEntriesRequest extends EntityRequest {
  id: number;
  semester: number;
}
