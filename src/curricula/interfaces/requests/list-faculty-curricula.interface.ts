import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface ListFacultyCurricula extends EntityRequest {
  facultyId: number;
  years: string;
}
