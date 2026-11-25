import {
  OrderBoxListStyles,
  OrderBoxVariant,
  OrderBoxVariantStyles,
} from '@/components/Order/OrderBox/types';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

export const ORDER_BOX_VARIANTS = {
  LIST: 'list',
  BOX: 'box',
} as const;

export const ORDER_BOX_EMPTY_LABEL = '주문 없음';

export const ORDER_BOX_LIST_BASE_STYLE = 'flex-v-stack w-full gap-[2px]';

export const ORDER_BOX_ROW_STYLE =
  'flex-h-stack w-full items-start justify-between gap-[8px]';

export const ORDER_BOX_ITEM_NAME_STYLE = 'min-w-0';

export const ORDER_BOX_QUANTITY_STYLE = 'shrink-0 whitespace-nowrap';

export const ORDER_BOX_BOX_BASE_STYLE =
  'w-full rounded-16 px-[17px] py-[15px] inset-ring';

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

export const ORDER_BOX_BOX_LIST_STYLES: OrderBoxListStyles = {
  ITEM_NAME: {
    VARIANT: TYPOGRAPHY_VARIANTS.BODY,
    COLOR: COLOR_VARIANTS.GRAY_800,
  },
  QUANTITY: {
    VARIANT: TYPOGRAPHY_VARIANTS.BODY_BOLD,
    COLOR: COLOR_VARIANTS.GRAY_800,
  },
  NO_ORDER_COLOR: COLOR_VARIANTS.GRAY_400,
};

export const ORDER_BOX_VARIANT_STYLES: Record<
  OrderBoxVariant,
  OrderBoxVariantStyles
> = {
  [ORDER_BOX_VARIANTS.LIST]: {
    CONTAINER: '',
    EMPTY: '',
    LIST: ORDER_BOX_LIST_STYLES,
    EMPTY_LABEL: ORDER_BOX_LIST_STYLES.ITEM_NAME,
  },
  [ORDER_BOX_VARIANTS.BOX]: {
    CONTAINER: `${ORDER_BOX_BOX_BASE_STYLE} bg-white inset-ring-gray-100`,
    EMPTY: `${ORDER_BOX_BOX_BASE_STYLE} bg-gray-100 inset-ring-gray-300 text-center`,
    LIST: ORDER_BOX_BOX_LIST_STYLES,
    EMPTY_LABEL: {
      VARIANT: TYPOGRAPHY_VARIANTS.LABEL,
      COLOR: COLOR_VARIANTS.GRAY_400,
    },
  },
};
