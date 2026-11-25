import {
  OrderDateInfoDayType,
  OrderDateInfoSize,
  OrderDateInfoTheme,
} from '@/components/Order/OrderDateInfo/types';
import {
  ORDER_HOLIDAY_SUFFIX,
  ORDER_PUBLIC_HOLIDAY_SUFFIX,
} from '@/components/Order/shared/constants';
import {
  COLOR_VARIANTS,
  ColorVariants,
  TYPOGRAPHY_VARIANTS,
  TypographyVariants,
} from '@/variants';

export const ORDER_DATE_INFO_THEMES = {
  DEFAULT: 'default',
  MUTED: 'muted',
  RED: 'red',
} as const;

export const ORDER_DATE_INFO_SIZES = {
  MD: 'md',
  LG: 'lg',
} as const;

export const ORDER_DATE_INFO_DAY_TYPES = {
  WEEKDAY: 'weekday',
  WEEKEND: 'weekend',
  PUBLIC_HOLIDAY: 'publicHoliday',
} as const;

export const ORDER_DATE_INFO_BASE_STYLE = 'flex-v-stack items-start';

export const ORDER_DATE_INFO_TITLE_STYLE =
  'flex-h-stack items-center gap-[4px]';

export const ORDER_DATE_INFO_TITLE_WITH_DESCRIPTION_STYLE = '-mb-0.5';

export const ORDER_DATE_INFO_DESCRIPTION_COLOR = COLOR_VARIANTS.GRAY_400;

export const ORDER_DATE_INFO_TITLE_COLORS: Record<
  OrderDateInfoTheme,
  ColorVariants
> = {
  [ORDER_DATE_INFO_THEMES.DEFAULT]: COLOR_VARIANTS.GRAY_700,
  [ORDER_DATE_INFO_THEMES.MUTED]: COLOR_VARIANTS.GRAY_400,
  [ORDER_DATE_INFO_THEMES.RED]: COLOR_VARIANTS.RED_600,
};

export const ORDER_DATE_INFO_TITLE_VARIANTS: Record<
  OrderDateInfoSize,
  TypographyVariants
> = {
  [ORDER_DATE_INFO_SIZES.MD]: TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD,
  [ORDER_DATE_INFO_SIZES.LG]: TYPOGRAPHY_VARIANTS.BODY_LG_SEMIBOLD,
};

export const ORDER_DATE_INFO_DAY_TYPE_SUFFIXES: Partial<
  Record<OrderDateInfoDayType, string>
> = {
  [ORDER_DATE_INFO_DAY_TYPES.WEEKEND]: ORDER_HOLIDAY_SUFFIX,
  [ORDER_DATE_INFO_DAY_TYPES.PUBLIC_HOLIDAY]: ORDER_PUBLIC_HOLIDAY_SUFFIX,
};
