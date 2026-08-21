import { BottomActionBarVariant } from '@/components/BottomActionBar/types';

export const BOTTOM_ACTION_BAR_VARIANTS = {
  FLOATING: 'floating',
  SOLID: 'solid',
} as const;

export const BOTTOM_ACTION_BAR_BASE_STYLE =
  'flex-h-stack w-full items-center px-[20px] pt-[12px] pb-[28px]';

export const BOTTOM_ACTION_BAR_VARIANT_STYLES: Record<
  BottomActionBarVariant,
  string
> = {
  [BOTTOM_ACTION_BAR_VARIANTS.FLOATING]:
    'sticky bottom-0 bg-linear-to-t from-white from-[86.184%] to-white/0',
  [BOTTOM_ACTION_BAR_VARIANTS.SOLID]: 'bg-white',
};

export const BOTTOM_ACTION_BAR_GAP_STYLES = {
  DEFAULT: 'gap-[10px]',
  INFO: 'gap-[14px]',
} as const;

export const BOTTOM_ACTION_BAR_INFO_STYLE = 'shrink-0 whitespace-pre-line';

export const BOTTOM_ACTION_BAR_BUTTON_STYLE = 'min-w-0 flex-1';
