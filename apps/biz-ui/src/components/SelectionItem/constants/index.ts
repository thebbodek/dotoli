import { BADGE_THEMES, BADGE_VARIANTS } from '@/components/Badge/constants';
import { SelectionItemState } from '@/components/SelectionItem/types';

export const SELECTION_ITEM_STATES = {
  DEFAULT: 'default',
  SELECTED: 'selected',
} as const;

export const SELECTION_ITEM_BADGE_LABEL = '선택중';

export const SELECTION_ITEM_BADGE_THEME = BADGE_THEMES.PRIMARY;

export const SELECTION_ITEM_BADGE_VARIANT = BADGE_VARIANTS.FILLED;

export const SELECTION_ITEM_BASE_STYLE =
  'flex-h-stack h-[56px] w-full cursor-pointer items-center gap-[10px] rounded-6 px-[24px] transition-colors';

export const SELECTION_ITEM_LABEL_STYLE = 'min-w-0 flex-1 truncate text-left';

export const SELECTION_ITEM_STATE_STYLES: Record<SelectionItemState, string> = {
  [SELECTION_ITEM_STATES.DEFAULT]: 'bg-white',
  [SELECTION_ITEM_STATES.SELECTED]:
    'bg-blue-100 inset-ring inset-ring-blue-300',
};
