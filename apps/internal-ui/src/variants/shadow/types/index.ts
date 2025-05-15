import { SHADOW_VARIANTS } from '@/variants/shadow/variant';

export type ShadowVariants =
  (typeof SHADOW_VARIANTS)[keyof typeof SHADOW_VARIANTS];
