import { GenerateOrderDateInfoDateLabelProps } from '@/components/Order/OrderDateInfo/types';
import { ORDER_HOLIDAY_SUFFIX } from '@/components/Order/shared';

export const generateOrderDateInfoDateLabel = ({
  dateLabel,
  isHoliday,
}: GenerateOrderDateInfoDateLabelProps) => {
  if (!isHoliday) return dateLabel;

  return `${dateLabel} ${ORDER_HOLIDAY_SUFFIX}`;
};
