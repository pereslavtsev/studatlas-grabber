import { EntityRequest } from '../../../grabber/interfaces/requests/entity-request.interface';

export interface GetDocumentRequest extends EntityRequest {
  id: number;
}
