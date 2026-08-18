import { CheckboxState } from '@/components/Checkbox/types';
import { ICON_WEIGHTS } from '@/components/Icon/constants';

export const CHECKBOX_STATES = {
  DEFAULT: 'default',
  CHECKED: 'checked',
  DISABLED: 'disabled',
  CHECKED_DISABLED: 'checkedDisabled',
} as const;

export const CHECKBOX_ICON_KEY = 'check';

export const CHECKBOX_ICON_WEIGHT = ICON_WEIGHTS.BOLD;

export const CHECKBOX_BASE_STYLE =
  'flex-h-stack-center relative size-[28px] shrink-0 rounded-6 text-[16px] transition-colors';

export const CHECKBOX_INPUT_STYLE = 'sr-only';

export const CHECKBOX_STATE_STYLES: Record<CheckboxState, string> = {
  [CHECKBOX_STATES.DEFAULT]:
    'cursor-pointer bg-white inset-ring-4 inset-ring-gray-200',
  [CHECKBOX_STATES.CHECKED]: 'cursor-pointer bg-blue-500 text-white',
  [CHECKBOX_STATES.DISABLED]:
    'cursor-not-allowed bg-gray-100 inset-ring-4 inset-ring-gray-200',
  [CHECKBOX_STATES.CHECKED_DISABLED]:
    'cursor-not-allowed bg-gray-200 text-gray-300',
};
