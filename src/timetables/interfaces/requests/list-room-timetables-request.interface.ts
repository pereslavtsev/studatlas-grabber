import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListRoomTimetablesRequest extends EntityRequest {
  years: string;
  semester: 1 | 2;
}
