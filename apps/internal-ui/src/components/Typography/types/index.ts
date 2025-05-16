import { ElementType, HTMLAttributes, RefAttributes } from 'react';

import { TYPOGRAPHY_ELEMENTS } from '@/components/Typography/constants';
import { ColorVariants, TypographyVariants } from '@/variants';

export type TypographyElements =
  (typeof TYPOGRAPHY_ELEMENTS)[keyof typeof TYPOGRAPHY_ELEMENTS];

export type TypographyElementType = Extract<ElementType, TypographyElements>;

export interface TypographyProps<
  T extends TypographyElementType = typeof TYPOGRAPHY_ELEMENTS.SPAN,
> extends Pick<HTMLAttributes<T>, 'className' | 'title'>,
    RefAttributes<HTMLElement> {
  as?: T;
  variant?: TypographyVariants;
  color?: ColorVariants;
}
