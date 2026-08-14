import { HTMLAttributes } from 'react';

import { INFO_FIELD_LAYOUTS } from '@/components/Info/InfoField/constants';
import { ColorVariants, TypographyVariants } from '@/variants';

export type InfoFieldLayout =
  (typeof INFO_FIELD_LAYOUTS)[keyof typeof INFO_FIELD_LAYOUTS];

export interface InfoFieldLayoutStyles {
  CONTAINER: string;
  VALUE_VARIANT: TypographyVariants;
}

export interface InfoFieldColors {
  LABEL: ColorVariants;
  VALUE: ColorVariants;
}

export interface InfoFieldProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  label: string;
  value: string;
  layout?: InfoFieldLayout;
}
