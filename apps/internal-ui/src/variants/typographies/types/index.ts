import { TYPOGRAPHY_VARIANTS } from '@/variants/typographies/variant';

export type Typographies =
  (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];
