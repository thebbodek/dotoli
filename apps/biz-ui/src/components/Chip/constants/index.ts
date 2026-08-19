import { InputHTMLAttributes } from 'react';

import {
  ChipSelectMode,
  ChipState,
  ChipStateStyles,
} from '@/components/Chip/types';
import { ICON_WEIGHTS } from '@/components/Icon/constants';

export const CHIP_SELECT_MODES = {
  MULTIPLE: 'multiple',
  SINGLE: 'single',
} as const;

export const CHIP_DEFAULT_SELECT_MODE = CHIP_SELECT_MODES.MULTIPLE;

export const CHIP_INPUT_TYPES = {
  [CHIP_SELECT_MODES.MULTIPLE]: 'checkbox',
  [CHIP_SELECT_MODES.SINGLE]: 'radio',
} as const satisfies Record<
  ChipSelectMode,
  InputHTMLAttributes<HTMLInputElement>['type']
>;

export const CHIP_STATES = {
  DEFAULT: 'default',
  SELECTED: 'selected',
} as const;

export const CHIP_ICON_KEY = 'check';

export const CHIP_ICON_WEIGHT = ICON_WEIGHTS.BOLD;

export const CHIP_INPUT_STYLE = 'sr-only';

/**
 * @description: `shrink-0` · `whitespace-nowrap`이 없으면 칩이 좁은 컨테이너에서 찌그러집니다.
 * 근거는 docs/biz-ui/components/chip.md 「칩은 찌그러지지 않습니다」.
 * */
export const CHIP_BASE_STYLE =
  'flex-h-stack-center relative h-[32px] w-fit shrink-0 cursor-pointer gap-[4px] rounded-full px-[20px] whitespace-nowrap text-label-semibold transition-colors';

export const CHIP_ICON_STYLE = 'shrink-0 text-[12px] transition-colors';

export const CHIP_STATE_STYLES: Record<ChipState, ChipStateStyles> = {
  [CHIP_STATES.DEFAULT]: {
    CONTAINER: 'bg-white text-gray-900 inset-ring inset-ring-gray-200',
    ICON: 'text-gray-400',
  },
  [CHIP_STATES.SELECTED]: {
    CONTAINER: 'bg-gray-900 text-white',
    ICON: 'text-white',
  },
};
