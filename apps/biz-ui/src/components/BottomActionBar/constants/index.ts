import {
  BottomActionBarActionDefault,
  BottomActionBarVariant,
} from '@/components/BottomActionBar/types';
import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button';

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

export const BOTTOM_ACTION_BAR_ACTION_DEFAULTS: Record<
  'ACTION' | 'SUB_ACTION',
  BottomActionBarActionDefault
> = {
  ACTION: {
    variant: CTA_BUTTON_VARIANTS.FILLED,
    theme: CTA_BUTTON_THEMES.PRIMARY,
    size: CTA_BUTTON_SIZES.LG,
  },
  SUB_ACTION: {
    variant: CTA_BUTTON_VARIANTS.TONAL,
    theme: CTA_BUTTON_THEMES.GRAY,
    size: CTA_BUTTON_SIZES.LG,
  },
};

export const BOTTOM_ACTION_BAR_BUTTON_STYLES = {
  FILL: 'min-w-0 flex-1',
  HUG: 'shrink-0',
} as const;
