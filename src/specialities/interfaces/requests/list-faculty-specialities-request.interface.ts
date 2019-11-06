import { SpecialitiesOrder } from '../specialities-order.enum';

export interface ListFacultySpecialitiesRequest {
  academy_id: string;
  faculty_id: number;
  order_by: SpecialitiesOrder;
}
