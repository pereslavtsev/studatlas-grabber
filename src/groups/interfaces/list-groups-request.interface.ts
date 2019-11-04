import { GroupFilter } from './group-filter.enum';
import { GroupOrder } from './group-order.enum';

export interface ListGroupsRequest {
  academy_id: string;
  order_by: GroupOrder;
  filter_by: GroupFilter;
  related_id: number;
}
