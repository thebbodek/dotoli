import { TabVariant, TabVariantStyles } from '@/components/Tab/types';

export const TAB_VARIANTS = {
  LINE: 'line',
  FILLED: 'filled',
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
      [TAB_ITEM_STATES.DEFAULT]: 'text-body-semibold text-gray-500',
      [TAB_ITEM_STATES.SELECTED]:
        'text-body-bold text-gray-900 shadow-[inset_0_-2px_0_0_var(--color-gray-900)]',
    },
  },
  [TAB_VARIANTS.FILLED]: {
    LIST: 'gap-[4px] rounded-full bg-gray-100 p-[4px]',
    ITEM: 'h-[44px] rounded-full',
    STATES: {
      [TAB_ITEM_STATES.DEFAULT]: 'text-body-semibold text-gray-600',
      [TAB_ITEM_STATES.SELECTED]:
        'bg-white text-body-bold text-blue-500 shadow-8',
    },
  },
};
