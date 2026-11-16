import {
  ORDER_WEEK_STATUS_DATE_SUFFIX,
  ORDER_WEEK_STATUS_DAY_STATUS_LABELS,
  ORDER_WEEK_STATUS_WEEKDAY_SUFFIX,
} from '@/components/Order/OrderWeekStatus/constants';
import { GenerateOrderWeekStatusSrLabelProps } from '@/components/Order/OrderWeekStatus/types';

export const generateOrderWeekStatusSrLabel = ({
  date,
  dayLabel,
  status,
}: GenerateOrderWeekStatusSrLabelProps) => {
  return [
    date !== undefined && `${date}${ORDER_WEEK_STATUS_DATE_SUFFIX}`,
    `${dayLabel}${ORDER_WEEK_STATUS_WEEKDAY_SUFFIX}`,
    ORDER_WEEK_STATUS_DAY_STATUS_LABELS[status],
  ]
    .filter(Boolean)
    .join(' ');
};
