import { HTMLAttributes } from 'react';

import {
  ORDER_WEEK_STATUS_DAY_STATUSES,
  ORDER_WEEK_STATUS_SIZES,
} from '@/components/Order/OrderWeekStatus/constants';

export type OrderWeekStatusDayStatus =
  (typeof ORDER_WEEK_STATUS_DAY_STATUSES)[keyof typeof ORDER_WEEK_STATUS_DAY_STATUSES];

export type OrderWeekStatusDashedStatus = Extract<
  OrderWeekStatusDayStatus,
  | typeof ORDER_WEEK_STATUS_DAY_STATUSES.UNORDERED
  | typeof ORDER_WEEK_STATUS_DAY_STATUSES.DEADLINE_PASSED
>;

export type OrderWeekStatusSize =
  (typeof ORDER_WEEK_STATUS_SIZES)[keyof typeof ORDER_WEEK_STATUS_SIZES];

export interface OrderWeekStatusMarkSpec {
  BOX: string;
  DIAMETER: number;
}

export interface OrderWeekStatusDayItem {
  dayLabel: string;
  date?: number;
  status: OrderWeekStatusDayStatus;
}

export interface OrderWeekStatusProps
  extends Pick<HTMLAttributes<HTMLUListElement>, 'className' | 'aria-label'> {
  days: OrderWeekStatusDayItem[];
  size?: OrderWeekStatusSize;
}

export interface OrderWeekStatusDayProps
  extends OrderWeekStatusDayItem,
    Required<Pick<OrderWeekStatusProps, 'size'>> {}

export interface OrderWeekStatusMarkProps
  extends Pick<OrderWeekStatusDayItem, 'status'>,
    Required<Pick<OrderWeekStatusProps, 'size'>> {}

export interface GenerateOrderWeekStatusSrLabelProps
  extends OrderWeekStatusDayItem {}

export interface GenerateOrderWeekStatusMarkGeometryProps {
  diameter: number;
}
