import { OrderBoxListStyles } from '@/components/Order/OrderBox/types';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

export const ORDER_BOX_EMPTY_LABEL = '주문 없음';

export const ORDER_BOX_LIST_BASE_STYLE = 'flex-v-stack w-full gap-[2px]';

export const ORDER_BOX_ROW_STYLE =
  'flex-h-stack w-full items-start justify-between gap-[8px]';

export const ORDER_BOX_ITEM_NAME_STYLE = 'min-w-0';

export const ORDER_BOX_QUANTITY_STYLE = 'shrink-0 whitespace-nowrap';

export const ORDER_BOX_LIST_STYLES: OrderBoxListStyles = {
  ITEM_NAME: {
    VARIANT: TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD,
    COLOR: COLOR_VARIANTS.GRAY_900,
  },
  QUANTITY: {
    VARIANT: TYPOGRAPHY_VARIANTS.LABEL,
    COLOR: COLOR_VARIANTS.GRAY_700,
  },
};
