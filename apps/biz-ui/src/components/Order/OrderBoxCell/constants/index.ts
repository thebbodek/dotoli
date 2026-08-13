import {
  OrderBoxCellTone,
  OrderBoxCellToneStyles,
} from '@/components/Order/OrderBoxCell/types';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_BOX_CELL_TONES = {
  DEFAULT: 'default',
  INVERSE: 'inverse',
  MUTED: 'muted',
} as const;

export const ORDER_BOX_CELL_BASE_STYLE =
  'flex-v-stack max-w-[110px] min-w-[92px]';

export const ORDER_BOX_CELL_STYLES: Record<
  OrderBoxCellTone,
  OrderBoxCellToneStyles
> = {
  [ORDER_BOX_CELL_TONES.DEFAULT]: {
    BOXES: COLOR_VARIANTS.GRAY_900,
    ITEM_NAME: COLOR_VARIANTS.GRAY_600,
  },
  [ORDER_BOX_CELL_TONES.INVERSE]: {
    BOXES: COLOR_VARIANTS.WHITE,
    ITEM_NAME: COLOR_VARIANTS.WHITE,
  },
  [ORDER_BOX_CELL_TONES.MUTED]: {
    BOXES: COLOR_VARIANTS.GRAY_600,
    ITEM_NAME: COLOR_VARIANTS.GRAY_400,
  },
};
