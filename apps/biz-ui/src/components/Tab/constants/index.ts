import { TabVariant, TabVariantStyles } from '@/components/Tab/types';

export const TAB_VARIANTS = {
  LINE: 'line',
} as const;

export const TAB_ITEM_STATES = {
  DEFAULT: 'default',
  SELECTED: 'selected',
} as const;

export const TAB_ID_SEGMENTS = {
  ITEM: 'tab',
  PANEL: 'panel',
} as const;

export const TAB_ID_SEPARATOR = '-';

export const TAB_BASE_STYLE = 'grid w-full grid-flow-col auto-cols-fr';

export const TAB_ITEM_BASE_STYLE =
  'flex-h-stack-center cursor-pointer transition-colors';

export const TAB_VARIANT_STYLES: Record<TabVariant, TabVariantStyles> = {
  [TAB_VARIANTS.LINE]: {
    LIST: 'border-b border-gray-200 bg-white px-[20px]',
    ITEM: 'h-[48px]',
    STATES: {
      [TAB_ITEM_STATES.DEFAULT]: 'text-label-semibold text-gray-500',
      [TAB_ITEM_STATES.SELECTED]:
        'text-label-bold text-gray-900 shadow-[inset_0_-2px_0_0_var(--color-gray-900)]',
    },
  },
};
