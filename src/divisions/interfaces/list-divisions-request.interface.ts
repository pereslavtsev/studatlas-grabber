import { DivisionOrder } from './division-order.enum';

export interface ListDivisionsRequest {
  academy_id: string;
  order_by: DivisionOrder;
}
