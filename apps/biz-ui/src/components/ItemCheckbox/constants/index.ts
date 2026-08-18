import { ItemCheckboxState } from '@/components/ItemCheckbox/types';

export const ITEM_CHECKBOX_STATES = {
  DEFAULT: 'default',
  CHECKED: 'checked',
} as const;

export const ITEM_CHECKBOX_BASE_STYLE =
  'flex-h-stack w-full cursor-pointer items-center gap-[10px] rounded-6 border px-[20px] py-[15px] transition-colors';

export const ITEM_CHECKBOX_LABEL_STYLE = 'flex-1 text-left';

export const ITEM_CHECKBOX_STATE_STYLES: Record<ItemCheckboxState, string> = {
  [ITEM_CHECKBOX_STATES.DEFAULT]: 'border-gray-200 bg-white',
  [ITEM_CHECKBOX_STATES.CHECKED]: 'border-blue-300 bg-blue-100',
};
