import { ButtonIconProps } from '@/components/Button/shared/types';
import { ICON_WEIGHTS } from '@/components/Icon';

export const COLLAPSE_BUTTON_ICON_KEY: ButtonIconProps['iconKey'] =
  'caret-down';

export const COLLAPSE_BUTTON_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const COLLAPSE_BUTTON_LABELS = {
  EXPANDED: '접기',
  COLLAPSED: '더보기',
} as const;

export const COLLAPSE_BUTTON_BASE_STYLE =
  'flex-h-stack-center h-[38px] w-full cursor-pointer gap-1 rounded-6 bg-white px-[25px] text-gray-800 text-label inset-ring inset-ring-gray-200';

export const COLLAPSE_BUTTON_ICON_STYLE = 'text-gray-400';

export const COLLAPSE_BUTTON_OPEN_ICON_STYLE = 'rotate-180';
