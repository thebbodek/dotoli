import { OrderDateInfoStyles } from '@/components/Order/OrderDateInfo/types';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_DATE_INFO_BASE_STYLE = 'flex-v-stack items-start';

export const ORDER_DATE_INFO_NO_DELIVERY_LABEL = '배송없음';

export const ORDER_DATE_INFO_STYLES: OrderDateInfoStyles = {
  DATE: COLOR_VARIANTS.GRAY_700,
  HOLIDAY_DATE: COLOR_VARIANTS.RED_600,
  DELIVERY: COLOR_VARIANTS.BLUE_400,
  NO_DELIVERY: COLOR_VARIANTS.GRAY_400,
};
