import {
  BottomTabItemOption,
  BottomTabState,
  BottomTabStateStyles,
  BottomTabValue,
} from '@/components/BottomTab/types';
import { ICON_WEIGHTS } from '@/components/Icon/constants';
import { COLOR_VARIANTS } from '@/variants';

export const BOTTOM_TAB_VALUES = {
  TRANSACTION_HISTORY: 'transactionHistory',
  ORDER: 'order',
  MY_INFO: 'myInfo',
} as const;

export const BOTTOM_TAB_DEFAULT_VALUE = BOTTOM_TAB_VALUES.ORDER;

export const BOTTOM_TAB_STATES = {
  DEFAULT: 'default',
  SELECTED: 'selected',
} as const;

export const BOTTOM_TAB_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const BOTTOM_TAB_ARIA_LABEL = '주요 메뉴';

/**
 * @description: 배열 순서가 정책 COM-001의 탭 순서입니다.
 * */
export const BOTTOM_TAB_ITEMS: readonly BottomTabItemOption[] = [
  {
    value: BOTTOM_TAB_VALUES.TRANSACTION_HISTORY,
    label: '거래내역',
    iconKey: 'newspaper-clipping',
  },
  {
    value: BOTTOM_TAB_VALUES.ORDER,
    label: '주문',
    iconKey: 'package',
  },
  {
    value: BOTTOM_TAB_VALUES.MY_INFO,
    label: '내정보',
    iconKey: 'user-circle',
  },
];

export const BOTTOM_TAB_BASE_STYLE =
  'flex-h-stack safe-area-bottom w-full shrink-0 border-t border-gray-100 bg-white shadow-8';

export const BOTTOM_TAB_ITEM_STYLE =
  'flex-v-stack-center h-[60px] flex-1 cursor-pointer';

export const BOTTOM_TAB_ITEM_ICON_STYLE = '-mb-px transition-colors';

export const BOTTOM_TAB_ITEM_ICON_STYLES: Record<BottomTabValue, string> = {
  [BOTTOM_TAB_VALUES.TRANSACTION_HISTORY]: 'text-[26px]',
  [BOTTOM_TAB_VALUES.ORDER]: 'text-[26px]',
  [BOTTOM_TAB_VALUES.MY_INFO]: 'text-[28px]',
};

export const BOTTOM_TAB_ITEM_LABEL_STYLE = 'transition-colors';

export const BOTTOM_TAB_ITEM_STATE_STYLES: Record<
  BottomTabState,
  BottomTabStateStyles
> = {
  [BOTTOM_TAB_STATES.DEFAULT]: {
    ICON: 'text-gray-400',
    LABEL: COLOR_VARIANTS.GRAY_500,
  },
  [BOTTOM_TAB_STATES.SELECTED]: {
    ICON: 'text-black',
    LABEL: COLOR_VARIANTS.BLACK,
  },
};
