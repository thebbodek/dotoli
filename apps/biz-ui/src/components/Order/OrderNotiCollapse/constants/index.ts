import clsx from 'clsx';

import { ICON_WEIGHTS, IconProps } from '@/components/Icon';
import {
  OrderNotiCollapseType,
  OrderNotiCollapseTypeStyles,
} from '@/components/Order/OrderNotiCollapse/types';
import { MOTION_TIMING_STYLE } from '@/components/shared/constants';
import { COLOR_VARIANTS } from '@/variants';

export const ORDER_NOTI_COLLAPSE_TYPES = {
  ORDER_STOP: 'orderStop',
  ORDER_EDIT: 'orderEdit',
  FIXED_ORDER: 'fixedOrder',
  WEEKLY_ORDER: 'weeklyOrder',
} as const;

export const ORDER_NOTI_COLLAPSE_ICON_KEY: IconProps['iconKey'] = 'caret-down';

export const ORDER_NOTI_COLLAPSE_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const ORDER_NOTI_COLLAPSE_LABELS: Record<OrderNotiCollapseType, string> =
  {
    [ORDER_NOTI_COLLAPSE_TYPES.ORDER_STOP]: '주문 중지',
    [ORDER_NOTI_COLLAPSE_TYPES.ORDER_EDIT]: '주문 수정',
    [ORDER_NOTI_COLLAPSE_TYPES.FIXED_ORDER]: '고정주문',
    [ORDER_NOTI_COLLAPSE_TYPES.WEEKLY_ORDER]: '주간주문',
  };

export const ORDER_NOTI_COLLAPSE_BASE_STYLE =
  'flex-h-stack h-[62px] w-full cursor-pointer items-center justify-between gap-[8px] border-t border-gray-100 px-[20px]';

export const ORDER_NOTI_COLLAPSE_HEADING_STYLE = 'flex-v-stack min-w-0';

export const ORDER_NOTI_COLLAPSE_TEXT_STYLE = 'w-full truncate text-left';

export const ORDER_NOTI_COLLAPSE_TRAILING_STYLE =
  'flex-h-stack shrink-0 items-center gap-[4px]';

export const ORDER_NOTI_COLLAPSE_CARET_WRAPPER_STYLE =
  'flex-h-stack-center size-[24px] shrink-0';

export const ORDER_NOTI_COLLAPSE_CARET_STYLE = clsx(
  'text-[16px] text-gray-400 transition-transform',
  MOTION_TIMING_STYLE,
);

export const ORDER_NOTI_COLLAPSE_OPEN_CARET_STYLE = 'rotate-180';

export const ORDER_NOTI_COLLAPSE_STYLES: Record<
  OrderNotiCollapseType,
  OrderNotiCollapseTypeStyles
> = {
  [ORDER_NOTI_COLLAPSE_TYPES.ORDER_STOP]: {
    CONTAINER: 'bg-red-50',
    LABEL: COLOR_VARIANTS.RED_700,
  },
  [ORDER_NOTI_COLLAPSE_TYPES.ORDER_EDIT]: {
    CONTAINER: 'bg-yellow-50',
    LABEL: COLOR_VARIANTS.YELLOW_700,
  },
  [ORDER_NOTI_COLLAPSE_TYPES.FIXED_ORDER]: {
    CONTAINER: 'bg-gray-50',
    LABEL: COLOR_VARIANTS.BLUE_700,
  },
  [ORDER_NOTI_COLLAPSE_TYPES.WEEKLY_ORDER]: {
    CONTAINER: 'bg-gray-50',
    LABEL: COLOR_VARIANTS.BLUE_700,
  },
};
