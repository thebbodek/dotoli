import { TabVariant } from '@/components/Tab/types';
import { TypographyVariants } from '@/variants';

export const TAB_PANEL_ID_SUFFIX = '-panel';

export const TAB_VARIANTS = {
  FILLED: 'filled',
  LINE: 'line',
} as const;

export const TAB_THEMES = {
  PRIMARY: 'primary',
  GRAY: 'gray',
} as const;

export const TAB_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const TAB_SIZE_STYLES = {
  [TAB_VARIANTS.LINE]: {
    [TAB_SIZES.MD]: 'h-11 px-4 text-body-16-r gap-x-[0.187rem]',
    [TAB_SIZES.SM]: 'h-9 px-3 text-body-14-r gap-x-[0.187rem]',
  },
  [TAB_VARIANTS.FILLED]: {
    [TAB_SIZES.MD]: 'h-8 px-4 text-body-14-b gap-x-1',
    [TAB_SIZES.SM]: 'h-[1.625rem] px-3 text-body-12-b gap-x-1',
  },
} as const;

export const TAB_THEME_STYLES = {
  [TAB_THEMES.GRAY]: {
    [TAB_VARIANTS.LINE]: {
      list: 'border-b border-b-gray-02',
      label: 'not-disabled:aria-selected:text-black',
      number: 'not-group-disabled:group-aria-selected:text-gray-06',
      indicator: 'border-b-black',
    },
    [TAB_VARIANTS.FILLED]: {
      list: 'bg-gray-02 rounded-8',
      label: 'not-disabled:aria-selected:text-black',
      number: 'not-group-disabled:group-aria-selected:text-gray-05',
      indicator: 'border-gray-05',
    },
  },
  [TAB_THEMES.PRIMARY]: {
    [TAB_VARIANTS.LINE]: {
      list: 'border-b border-b-gray-02',
      label: 'not-disabled:aria-selected:text-primary-06',
      number: 'not-group-disabled:group-aria-selected:text-primary-05',
      indicator: 'border-b-primary-06',
    },
    [TAB_VARIANTS.FILLED]: {
      list: 'bg-primary-02 rounded-8',
      label: 'not-disabled:aria-selected:text-primary-05',
      number: 'not-group-disabled:group-aria-selected:text-primary-05',
      indicator: 'border-primary-05',
    },
  },
} as const;

export const TAB_NUMBER_TYPOGRAPHY_VARIANT: Record<
  TabVariant,
  TypographyVariants
> = {
  [TAB_VARIANTS.LINE]: 'body-14-r',
  [TAB_VARIANTS.FILLED]: 'body-14-m',
};

export const TAB_INDICATOR_VARIANT_STYLES = {
  [TAB_VARIANTS.LINE]:
    'border-b-2 -bottom-[1px] peer-disabled:border-b-gray-04',
  [TAB_VARIANTS.FILLED]:
    'bg-white h-full border rounded-8 peer-disabled:border-gray-03',
} as const;
