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

export const CHECKBOX_LABEL_STYLE = 'flex-h-stack-center relative w-fit';

export const CHECKBOX_INPUT_STYLE = 'sr-only';

export const CHECKBOX_ICON_STYLE =
  'flex-h-stack-center size-[28px] shrink-0 rounded-6 text-[16px] transition-colors';

export const CHECKBOX_CURSOR_STYLES = {
  ENABLED: 'cursor-pointer',
  DISABLED: 'cursor-not-allowed',
} as const;

export const CHECKBOX_STATE_STYLES: Record<CheckboxState, string> = {
  [CHECKBOX_STATES.DEFAULT]: 'bg-white inset-ring-4 inset-ring-gray-200',
  [CHECKBOX_STATES.CHECKED]: 'bg-blue-500 text-white',
  [CHECKBOX_STATES.DISABLED]: 'bg-gray-100 inset-ring-4 inset-ring-gray-200',
  [CHECKBOX_STATES.CHECKED_DISABLED]: 'bg-gray-200 text-gray-300',
};
