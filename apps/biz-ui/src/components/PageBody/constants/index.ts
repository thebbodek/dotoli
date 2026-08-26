import { PageBodyVariant } from '@/components/PageBody/types';

export const PAGE_BODY_VARIANTS = {
  STICKY_TOP: 'stickyTop',
  TOP: 'top',
  GRAY_TOP: 'grayTop',
  MIDDLE: 'middle',
  GRAY_MIDDLE: 'grayMiddle',
  BORDER_MIDDLE: 'borderMiddle',
  FOOTER: 'footer',
} as const;

export const PAGE_BODY_DEFAULT_VARIANT = PAGE_BODY_VARIANTS.MIDDLE;

export const PAGE_BODY_BASE_STYLE = 'flex-v-stack w-full shrink-0 px-[20px]';

export const PAGE_BODY_VARIANT_STYLES: Record<PageBodyVariant, string> = {
  [PAGE_BODY_VARIANTS.STICKY_TOP]:
    'sticky top-0 z-10 bg-white pt-[8px] pb-[12px]',
  [PAGE_BODY_VARIANTS.TOP]: 'gap-[24px] bg-white pt-[36px] pb-[28px]',
  [PAGE_BODY_VARIANTS.GRAY_TOP]: 'gap-[24px] bg-gray-100 pt-[36px] pb-[28px]',
  [PAGE_BODY_VARIANTS.MIDDLE]: 'gap-[24px] bg-white py-[28px]',
  [PAGE_BODY_VARIANTS.GRAY_MIDDLE]: 'gap-[24px] bg-gray-100 py-[28px]',
  [PAGE_BODY_VARIANTS.BORDER_MIDDLE]:
    'gap-[24px] border-t-8 border-gray-100 bg-white py-[28px]',
  [PAGE_BODY_VARIANTS.FOOTER]: 'bg-gray-100 py-[28px]',
};
