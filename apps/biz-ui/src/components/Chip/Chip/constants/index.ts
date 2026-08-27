import { InputHTMLAttributes } from 'react';

import {
  ChipSelectMode,
  ChipState,
  ChipStateStyles,
} from '@/components/Chip/Chip/types';
import { CHIP_DEFAULT_CONTAINER_STYLE } from '@/components/Chip/shared';
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

export const CHIP_ICON_STYLE = 'shrink-0 text-[12px] transition-colors';

export const CHIP_STATE_STYLES: Record<ChipState, ChipStateStyles> = {
  [CHIP_STATES.DEFAULT]: {
    CONTAINER: CHIP_DEFAULT_CONTAINER_STYLE,
    ICON: 'text-gray-400',
  },
  [CHIP_STATES.SELECTED]: {
    CONTAINER: 'bg-gray-900 text-white',
    ICON: 'text-white',
  },
};
