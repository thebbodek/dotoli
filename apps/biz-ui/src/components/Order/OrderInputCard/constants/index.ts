import {
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton';
import {
  OrderInputCardButtonStyles,
  OrderInputCardDayStyles,
  OrderInputCardItemStyles,
  OrderInputCardOrderStatus,
  OrderInputCardStatusStyles,
} from '@/components/Order/OrderInputCard/types';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_INPUT_CARD_ORDER_STATUSES = {
  INPUT_REQUIRED: 'inputRequired',
  COMPLETED: 'completed',
  NO_ORDER: 'noOrder',
  INPUT_CLOSED: 'inputClosed',
} as const;

export const ORDER_INPUT_CARD_BASE_STYLE =
  'flex-v-stack rounded-16 gap-[10px] px-[20px] py-[14px] inset-ring';

export const ORDER_INPUT_CARD_ROW_STYLE =
  'flex-h-stack w-full items-center gap-[5px]';

export const ORDER_INPUT_CARD_SUMMARY_STYLE =
  'flex-h-stack min-w-0 flex-1 items-center gap-[8px]';

export const ORDER_INPUT_CARD_DAY_STYLE =
  'flex-v-stack-center size-[40px] shrink-0 rounded-full';

export const ORDER_INPUT_CARD_TEXT_STYLE = 'flex-v-stack justify-center';

export const ORDER_INPUT_CARD_ITEMS_STYLE =
  'flex-v-stack rounded-10 w-full gap-[2px] bg-blue-50 px-[16px] py-[14px]';

export const ORDER_INPUT_CARD_ITEM_STYLE =
  'flex-h-stack w-full items-center justify-between gap-[8px]';

export const ORDER_INPUT_CARD_EMPTY_ITEM_LABEL = '주문없음';

export const ORDER_INPUT_CARD_STATUS_LABEL_COLOR = COLOR_VARIANTS.GRAY_400;

export const ORDER_INPUT_CARD_HOLIDAY_DAY_STYLE: OrderInputCardDayStyles = {
  CONTAINER: 'bg-red-50',
  LABEL: COLOR_VARIANTS.RED_400,
};

export const ORDER_INPUT_CARD_ITEM_STYLES: OrderInputCardItemStyles = {
  ORDERED: COLOR_VARIANTS.GRAY_800,
  EMPTY: COLOR_VARIANTS.BLUE_200,
};

export const ORDER_INPUT_CARD_STATUS_LABELS: Partial<
  Record<OrderInputCardOrderStatus, string>
> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED]: '입력필요',
  [ORDER_INPUT_CARD_ORDER_STATUSES.NO_ORDER]: '주문없음',
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_CLOSED]: '주문마감',
};

export const ORDER_INPUT_CARD_ACTION_LABELS: Record<
  OrderInputCardOrderStatus,
  string
> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED]: '주문입력',
  [ORDER_INPUT_CARD_ORDER_STATUSES.COMPLETED]: '주문수정',
  [ORDER_INPUT_CARD_ORDER_STATUSES.NO_ORDER]: '주문수정',
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_CLOSED]: '주문마감',
};

export const ORDER_INPUT_CARD_BUTTON_STYLES: Partial<
  Record<OrderInputCardOrderStatus, OrderInputCardButtonStyles>
> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED]: {
    theme: CTA_BUTTON_THEMES.PRIMARY,
    variant: CTA_BUTTON_VARIANTS.FILLED,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.COMPLETED]: {
    theme: CTA_BUTTON_THEMES.PRIMARY,
    variant: CTA_BUTTON_VARIANTS.OUTLINED,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.NO_ORDER]: {
    theme: CTA_BUTTON_THEMES.GRAY,
    variant: CTA_BUTTON_VARIANTS.OUTLINED,
  },
};

export const ORDER_INPUT_CARD_STYLES: Record<
  OrderInputCardOrderStatus,
  OrderInputCardStatusStyles
> = {
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_REQUIRED]: {
    CARD: 'bg-white inset-ring-gray-100',
    DAY: { CONTAINER: 'bg-gray-50', LABEL: COLOR_VARIANTS.GRAY_700 },
    DATE: COLOR_VARIANTS.GRAY_800,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.COMPLETED]: {
    CARD: 'bg-white inset-ring-blue-300',
    DAY: { CONTAINER: 'bg-blue-50', LABEL: COLOR_VARIANTS.BLUE_500 },
    DATE: COLOR_VARIANTS.GRAY_800,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.NO_ORDER]: {
    CARD: 'bg-gray-50 inset-ring-gray-100',
    DAY: { CONTAINER: 'bg-gray-300', LABEL: COLOR_VARIANTS.GRAY_50 },
    DATE: COLOR_VARIANTS.GRAY_400,
  },
  [ORDER_INPUT_CARD_ORDER_STATUSES.INPUT_CLOSED]: {
    CARD: 'bg-gray-50 inset-ring-gray-100',
    DAY: { CONTAINER: 'bg-gray-300', LABEL: COLOR_VARIANTS.GRAY_50 },
    DATE: COLOR_VARIANTS.GRAY_400,
  },
};
