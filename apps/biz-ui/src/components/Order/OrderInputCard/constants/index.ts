import {
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton';
import { ORDER_DATE_INFO_THEMES } from '@/components/Order/OrderDateInfo/constants';
import {
  OrderInputCardAppearance,
  OrderInputCardAppearanceStyles,
  OrderInputCardButtonStyles,
  OrderInputCardDayStyles,
  OrderInputCardOrderStatus,
} from '@/components/Order/OrderInputCard/types';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_INPUT_CARD_ORDER_STATUSES = {
  UNSET: 'unset',
  ZERO: 'zero',
  ORDERED: 'ordered',
} as const;

export const ORDER_INPUT_CARD_APPEARANCES = {
  UNSET: ORDER_INPUT_CARD_ORDER_STATUSES.UNSET,
  ORDERED: ORDER_INPUT_CARD_ORDER_STATUSES.ORDERED,
  MUTED: 'muted',
} as const;

export const ORDER_INPUT_CARD_BASE_STYLE =
  'flex-v-stack rounded-16 gap-[10px] px-[20px] py-[14px] inset-ring';

export const ORDER_INPUT_CARD_ROW_STYLE =
  'flex-h-stack w-full items-center gap-[5px]';

export const ORDER_INPUT_CARD_SUMMARY_STYLE =
  'flex-h-stack min-w-0 flex-1 items-center gap-[8px]';

export const ORDER_INPUT_CARD_DAY_STYLE =
  'flex-v-stack-center size-[40px] shrink-0 rounded-full';

export const ORDER_INPUT_CARD_DATE_INFO_STYLE = 'min-w-0';

export const ORDER_INPUT_CARD_ITEMS_STYLE = 'rounded-10 px-[16px] py-[14px]';

export const ORDER_INPUT_CARD_ITEMS_BACKGROUNDS = {
  DEFAULT: 'bg-blue-50',
  LOCKED: 'bg-gray-100',
} as const;

export const ORDER_INPUT_CARD_HOLIDAY_DAY_STYLE: OrderInputCardDayStyles = {
  CONTAINER: 'bg-red-50',
  LABEL: COLOR_VARIANTS.RED_400,
};

export const ORDER_INPUT_CARD_ACTION_LABELS: Record<
  OrderInputCardOrderStatus,
  string
> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.UNSET]: '주문 입력',
  [ORDER_INPUT_CARD_ORDER_STATUSES.ZERO]: '주문 수정',
  [ORDER_INPUT_CARD_ORDER_STATUSES.ORDERED]: '주문 수정',
};

export const ORDER_INPUT_CARD_BUTTON_STYLES: Record<
  OrderInputCardOrderStatus,
  OrderInputCardButtonStyles
> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.UNSET]: {
    theme: CTA_BUTTON_THEMES.PRIMARY,
    variant: CTA_BUTTON_VARIANTS.FILLED,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.ZERO]: {
    theme: CTA_BUTTON_THEMES.GRAY,
    variant: CTA_BUTTON_VARIANTS.OUTLINED,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.ORDERED]: {
    theme: CTA_BUTTON_THEMES.PRIMARY,
    variant: CTA_BUTTON_VARIANTS.OUTLINED,
  },
};

export const ORDER_INPUT_CARD_STYLES: Record<
  OrderInputCardAppearance,
  OrderInputCardAppearanceStyles
> = {
  [ORDER_INPUT_CARD_APPEARANCES.UNSET]: {
    CARD: 'bg-white inset-ring-gray-100',
    DAY: { CONTAINER: 'bg-gray-50', LABEL: COLOR_VARIANTS.GRAY_700 },
    DATE_INFO_THEME: ORDER_DATE_INFO_THEMES.DEFAULT,
  },
  [ORDER_INPUT_CARD_APPEARANCES.ORDERED]: {
    CARD: 'bg-white inset-ring-blue-300',
    DAY: { CONTAINER: 'bg-blue-50', LABEL: COLOR_VARIANTS.BLUE_500 },
    DATE_INFO_THEME: ORDER_DATE_INFO_THEMES.DEFAULT,
  },
  [ORDER_INPUT_CARD_APPEARANCES.MUTED]: {
    CARD: 'bg-gray-50 inset-ring-gray-100',
    DAY: { CONTAINER: 'bg-gray-300', LABEL: COLOR_VARIANTS.GRAY_50 },
    DATE_INFO_THEME: ORDER_DATE_INFO_THEMES.MUTED,
  },
};
