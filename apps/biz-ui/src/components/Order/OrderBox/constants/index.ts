import { OrderBoxCellState } from '@/components/Order/OrderBox/types';
import { COLOR_VARIANTS, ColorVariants } from '@/variants';

export const ORDER_BOX_CELL_STATES = {
  DEFAULT: 'default',
  MUTED: 'muted',
  EMPTY: 'empty',
} as const;

export const ORDER_BOX_NO_ORDER_LABEL = '주문 없음';

export const ORDER_BOX_EMPTY_LABEL = ORDER_BOX_NO_ORDER_LABEL;

export const ORDER_BOX_QUANTITY_UNITS = {
  BOX: '박스',
  UNIT: '개',
} as const;

export const ORDER_BOX_BASE_STYLE =
  'w-full rounded-16 px-[17px] py-[15px] inset-ring';

export const ORDER_BOX_STYLE = `${ORDER_BOX_BASE_STYLE} bg-white inset-ring-gray-100`;

export const ORDER_BOX_EMPTY_STYLE = `${ORDER_BOX_BASE_STYLE} bg-gray-100 inset-ring-gray-300 text-center`;

export const ORDER_BOX_EMPTY_LABEL_COLOR = COLOR_VARIANTS.GRAY_400;

export const ORDER_BOX_LIST_BASE_STYLE = 'flex-v-stack w-full gap-[2px]';

export const ORDER_BOX_CELL_STYLE =
  'flex-h-stack w-full items-start justify-between gap-[8px]';

export const ORDER_BOX_PACKAGE_NAME_STYLE = 'min-w-0';

export const ORDER_BOX_QUANTITY_STYLE = 'shrink-0 whitespace-nowrap';

export const ORDER_BOX_CELL_COLORS: Record<OrderBoxCellState, ColorVariants> = {
  [ORDER_BOX_CELL_STATES.DEFAULT]: COLOR_VARIANTS.GRAY_800,
  [ORDER_BOX_CELL_STATES.MUTED]: COLOR_VARIANTS.GRAY_500,
  [ORDER_BOX_CELL_STATES.EMPTY]: COLOR_VARIANTS.GRAY_400,
};
