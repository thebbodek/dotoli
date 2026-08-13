import { GenerateOrderInputCardDateLabelProps } from '@/components/Order/OrderInputCard/types';
import {
  ORDER_HOLIDAY_LABEL,
  ORDER_HOLIDAY_SUFFIX,
} from '@/components/Order/shared';

export const generateOrderInputCardDateLabel = ({
  dateLabel,
  isHoliday,
}: GenerateOrderInputCardDateLabelProps) => {
  if (!isHoliday) return dateLabel;

  if (!dateLabel) return ORDER_HOLIDAY_LABEL;

  return `${dateLabel} ${ORDER_HOLIDAY_SUFFIX}`;
};
