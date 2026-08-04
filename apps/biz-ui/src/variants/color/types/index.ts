import { COLOR_TYPES, COLOR_VARIANTS } from '@/variants/color/variant';

export type ColorVariants =
  (typeof COLOR_VARIANTS)[keyof typeof COLOR_VARIANTS];

export type ColorTypes = (typeof COLOR_TYPES)[keyof typeof COLOR_TYPES];
