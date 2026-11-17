import { OrderDateInfoStyles } from '@/components/Order/OrderDateInfo/types';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_DATE_INFO_BASE_STYLE =
  'flex-h-stack min-h-[32px] w-full items-center justify-between gap-[8px]';

export const ORDER_DATE_INFO_DATE_STYLE = 'min-w-0';

export const ORDER_DATE_INFO_TRAILING_STYLE =
  'flex-h-stack shrink-0 items-center gap-[8px]';

export const ORDER_DATE_INFO_STYLES: OrderDateInfoStyles = {
  DATE: COLOR_VARIANTS.GRAY_900,
  HOLIDAY_DATE: COLOR_VARIANTS.RED_400,
  DEADLINE: COLOR_VARIANTS.GRAY_600,
};
