import { FacultyOrder } from './faculty-order.enum';

export interface ListFacultiesRequest {
  academy_id: string;
  order_by: FacultyOrder;
}
