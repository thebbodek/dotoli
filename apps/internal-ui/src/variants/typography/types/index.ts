import { TYPOGRAPHY_VARIANTS } from '@/variants/typography/variant';

export type TypographyVariants =
  (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
