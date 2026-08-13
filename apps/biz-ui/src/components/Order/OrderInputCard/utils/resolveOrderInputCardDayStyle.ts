import {
  ORDER_INPUT_CARD_HOLIDAY_DAY_STYLE,
  ORDER_INPUT_CARD_ORDER_STATUSES,
  ORDER_INPUT_CARD_STYLES,
} from '@/components/Order/OrderInputCard/constants';
import { ResolveOrderInputCardDayStyleProps } from '@/components/Order/OrderInputCard/types';

export const resolveOrderInputCardDayStyle = ({
  orderStatus,
  isHoliday,
}: ResolveOrderInputCardDayStyleProps) => {
  const isInputRequired =
    orderStatus === ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED;

  if (isHoliday && isInputRequired) return ORDER_INPUT_CARD_HOLIDAY_DAY_STYLE;

  return ORDER_INPUT_CARD_STYLES[orderStatus].DAY;
};
