import { ORDER_DATE_INFO_DAY_TYPES } from '@/components/Order/OrderDateInfo/constants';
import {
  ORDER_INPUT_CARD_APPEARANCES,
  ORDER_INPUT_CARD_HOLIDAY_DAY_STYLE,
  ORDER_INPUT_CARD_STYLES,
} from '@/components/Order/OrderInputCard/constants';
import { ResolveOrderInputCardDayStyleProps } from '@/components/Order/OrderInputCard/types';

export const resolveOrderInputCardDayStyle = ({
  appearance,
  dayType,
}: ResolveOrderInputCardDayStyleProps) => {
  const isMuted = appearance === ORDER_INPUT_CARD_APPEARANCES.MUTED;
  const isHoliday = !!dayType && dayType !== ORDER_DATE_INFO_DAY_TYPES.WEEKDAY;

  if (isHoliday && !isMuted) return ORDER_INPUT_CARD_HOLIDAY_DAY_STYLE;

  return ORDER_INPUT_CARD_STYLES[appearance].DAY;
};
