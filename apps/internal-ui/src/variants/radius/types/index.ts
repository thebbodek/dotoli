import { RADIUS_VARIANTS } from '@/variants/radius/variant';

export type RadiusVariants =
  (typeof RADIUS_VARIANTS)[keyof typeof RADIUS_VARIANTS];
