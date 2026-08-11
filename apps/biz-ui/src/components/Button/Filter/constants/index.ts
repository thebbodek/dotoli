import {
  FilterState,
  FilterStateStyles,
} from '@/components/Button/Filter/types';

export const FILTER_STATES = {
  DEFAULT: 'default',
  SELECTED: 'selected',
} as const;

export const FILTER_BASE_STYLE =
  'flex-h-stack-center cursor-pointer gap-1 rounded-6 border px-[13px] py-[6px] text-gray-800 text-label-semibold transition-colors';

export const FILTER_STYLES: Record<FilterState, FilterStateStyles> = {
  [FILTER_STATES.DEFAULT]: {
    CONTAINER: 'border-gray-200 bg-white',
    ICON: 'text-gray-400',
  },
  [FILTER_STATES.SELECTED]: {
    CONTAINER: 'border-blue-300 bg-blue-100',
    ICON: 'text-blue-600',
  },
};
