import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

export const TOGGLE_LIST_ITEM_BASE_STYLE =
  'flex-h-stack h-[51px] w-full items-center gap-[2px]';

export const TOGGLE_LIST_ITEM_TEXT_STYLE =
  'flex-v-stack min-w-0 flex-1 gap-[2px] text-left';

export const TOGGLE_LIST_ITEM_TRUNCATE_STYLE = 'truncate';

export const TOGGLE_LIST_ITEM_TEXT_VARIANTS = {
  LABEL: TYPOGRAPHY_VARIANTS.HEADING_5,
  DESCRIPTION: TYPOGRAPHY_VARIANTS.BODY,
} as const;

export const TOGGLE_LIST_ITEM_TEXT_COLORS = {
  LABEL: COLOR_VARIANTS.BLACK,
  DESCRIPTION: COLOR_VARIANTS.GRAY_700,
} as const;
