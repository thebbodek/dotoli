import { FloatingPillVariant } from '@/components/Button/FloatingPill/types';

export const FLOATING_PILL_VARIANTS = {
  NAVIGATE: 'navigate',
  SCROLL_TO_TOP: 'scrollToTop',
} as const;

export const FLOATING_PILL_SCROLL_TO_TOP_ICON_KEY = 'caret-up';

export const FLOATING_PILL_BASE_STYLE =
  'flex-h-stack-center h-[50px] cursor-pointer gap-1 rounded-full px-[26px] py-[12px] text-heading-5 shadow-20';

export const FLOATING_PILL_STYLES: Record<FloatingPillVariant, string> = {
  [FLOATING_PILL_VARIANTS.NAVIGATE]: 'bg-blue-500 text-white',
  [FLOATING_PILL_VARIANTS.SCROLL_TO_TOP]:
    'inset-ring-[0.5625px] inset-ring-gray-100 bg-white text-gray-800',
};
