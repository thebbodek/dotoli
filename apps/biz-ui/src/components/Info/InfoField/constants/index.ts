import {
  InfoFieldColors,
  InfoFieldLayout,
  InfoFieldLayoutStyles,
} from '@/components/Info/InfoField/types';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

export const INFO_FIELD_LAYOUTS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export const INFO_FIELD_BASE_STYLE = 'w-full';

export const INFO_FIELD_LAYOUT_STYLES: Record<
  InfoFieldLayout,
  InfoFieldLayoutStyles
> = {
  [INFO_FIELD_LAYOUTS.HORIZONTAL]: {
    CONTAINER: 'flex-h-stack items-start justify-between py-[2px]',
    VALUE_VARIANT: TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD,
  },
  [INFO_FIELD_LAYOUTS.VERTICAL]: {
    CONTAINER: 'flex-v-stack items-start gap-[2px]',
    VALUE_VARIANT: TYPOGRAPHY_VARIANTS.HEADING_4,
  },
};

export const INFO_FIELD_VALUE_STYLE = 'min-w-0 break-all';

export const INFO_FIELD_COLORS: InfoFieldColors = {
  LABEL: COLOR_VARIANTS.GRAY_600,
  VALUE: COLOR_VARIANTS.GRAY_700,
};
