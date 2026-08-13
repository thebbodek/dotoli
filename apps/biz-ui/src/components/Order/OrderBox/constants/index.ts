import {
  OrderBoxVariant,
  OrderBoxVariantStyles,
} from '@/components/Order/OrderBox/types';
import { ORDER_BOX_CELL_TONES } from '@/components/Order/OrderBoxCell';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_BOX_VARIANTS = {
  NO_BG: 'noBg',
  DEFAULT: 'default',
  PAST: 'past',
} as const;

export const ORDER_BOX_BASE_STYLE =
  'flex-h-stack flex-wrap gap-[12px] px-[16px] py-[14px]';

export const ORDER_BOX_ITEMS_STYLE = 'content-start items-start';

export const ORDER_BOX_ITEM_STYLE = 'flex-1';

export const ORDER_BOX_EMPTY_LABEL = '주문 없음';

export const ORDER_BOX_EMPTY_LABEL_COLOR = COLOR_VARIANTS.GRAY_400;

export const ORDER_BOX_EMPTY_STYLE =
  'rounded-16 items-center justify-center bg-gray-100';

export const ORDER_BOX_STYLES: Record<OrderBoxVariant, OrderBoxVariantStyles> =
  {
    [ORDER_BOX_VARIANTS.NO_BG]: {
      TONE: ORDER_BOX_CELL_TONES.DEFAULT,
    },
    [ORDER_BOX_VARIANTS.DEFAULT]: {
      CONTAINER: 'rounded-16 bg-white inset-ring inset-ring-gray-100',
      TONE: ORDER_BOX_CELL_TONES.DEFAULT,
    },
    [ORDER_BOX_VARIANTS.PAST]: {
      CONTAINER: 'rounded-16 bg-gray-100',
      TONE: ORDER_BOX_CELL_TONES.MUTED,
    },
  };
