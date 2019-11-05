import { SpecialitiesOrder } from './specialities-order.enum';

export interface ListSpecialitiesRequest {
  academy_id: string;
  order_by: SpecialitiesOrder;
}
