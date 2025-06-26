import {
  ButtonSize,
  ButtonState,
  ButtonTheme,
  ButtonVariant,
} from '@/components/Button/shared/types';

export const BUTTON_PENDING_ICON_KEY = 'circle-notch';

export const BUTTON_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TONAL: 'tonal',
  TEXT: 'text',
} as const;

export const BUTTON_THEMES = {
  PRIMARY: 'primary',
  GRAY: 'gray',
  RED: 'red',
  GREEN: 'green',
  YELLOW: 'yellow',
} as const;

export const BUTTON_SIZES = {
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const;

export const BUTTON_STATE = {
  DEFAULT: 'default',
  HOVER: 'hover',
  PRESSED: 'pressed',
  DISABLED: 'disabled',
} as const;

export const BUTTON_ICON_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const BUTTON_STYLES: Record<
  ButtonTheme,
  Partial<Record<ButtonVariant, Record<ButtonState, string>>>
> = {
  [BUTTON_THEMES.PRIMARY]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-primary-06 text-white',
      [BUTTON_STATE.HOVER]: 'hover:bg-primary-07',
      [BUTTON_STATE.PRESSED]: 'active:bg-primary-07',
      [BUTTON_STATE.DISABLED]: 'bg-gray-02 text-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'border-primary-05 bg-white text-primary-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-primary-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-primary-01',
      [BUTTON_STATE.DISABLED]: 'border-gray-02 text-gray-05 bg-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-primary-02 text-primary-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-primary-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-primary-03',
      [BUTTON_STATE.DISABLED]: 'bg-gray-01 text-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-primary-06',
      [BUTTON_STATE.HOVER]: 'hover:text-primary-08',
      [BUTTON_STATE.PRESSED]: 'active:text-primary-08',
      [BUTTON_STATE.DISABLED]: 'text-gray-04',
    },
  },
  [BUTTON_THEMES.GRAY]: {
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-white border-gray-02 text-gray-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-gray-01 hover:border-gray-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-gray-01 active:border-gray-03',
      [BUTTON_STATE.DISABLED]: 'text-gray-04 bg-white border-gray-02',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-gray-01 text-gray-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-gray-02',
      [BUTTON_STATE.PRESSED]: 'active:bg-gray-02',
      [BUTTON_STATE.DISABLED]: 'text-gray-04 bg-gray-01',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-gray-07',
      [BUTTON_STATE.HOVER]: 'hover:text-black',
      [BUTTON_STATE.PRESSED]: 'active:text-black',
      [BUTTON_STATE.DISABLED]: 'text-gray-04',
    },
  },
  [BUTTON_THEMES.RED]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-red-05 text-white',
      [BUTTON_STATE.HOVER]: 'hover:bg-red-06',
      [BUTTON_STATE.PRESSED]: 'active:bg-red-06',
      [BUTTON_STATE.DISABLED]: 'bg-gray-02 text-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'border-red-05 bg-white text-red-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-red-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-red-01',
      [BUTTON_STATE.DISABLED]: 'border-gray-02 text-gray-05 bg-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-red-02 text-red-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-red-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-red-03',
      [BUTTON_STATE.DISABLED]: 'bg-gray-01 text-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-red-06',
      [BUTTON_STATE.HOVER]: 'hover:text-red-07',
      [BUTTON_STATE.PRESSED]: 'active:text-red-07',
      [BUTTON_STATE.DISABLED]: 'text-gray-04',
    },
  },
  [BUTTON_THEMES.GREEN]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-green-05 text-white',
      [BUTTON_STATE.HOVER]: 'hover:bg-green-06',
      [BUTTON_STATE.PRESSED]: 'active:bg-green-06',
      [BUTTON_STATE.DISABLED]: 'bg-gray-02 text-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'border-green-05 bg-white text-green-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-green-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-green-01',
      [BUTTON_STATE.DISABLED]: 'border-gray-02 text-gray-05 bg-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-green-02 text-green-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-green-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-green-03',
      [BUTTON_STATE.DISABLED]: 'bg-gray-01 text-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-green-06',
      [BUTTON_STATE.HOVER]: 'hover:text-green-07',
      [BUTTON_STATE.PRESSED]: 'active:text-green-07',
      [BUTTON_STATE.DISABLED]: 'text-gray-04',
    },
  },
  [BUTTON_THEMES.YELLOW]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-yellow-04 text-yellow-09',
      [BUTTON_STATE.HOVER]: 'hover:bg-yellow-05',
      [BUTTON_STATE.PRESSED]: 'active:bg-yellow-05',
      [BUTTON_STATE.DISABLED]: 'bg-gray-02 text-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'border-yellow-04 bg-white text-yellow-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-yellow-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-yellow-01',
      [BUTTON_STATE.DISABLED]: 'border-gray-02 text-gray-05 bg-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-yellow-02 text-yellow-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-yellow-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-yellow-03',
      [BUTTON_STATE.DISABLED]: 'bg-gray-01 text-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-yellow-07',
      [BUTTON_STATE.HOVER]: 'hover:text-yellow-08',
      [BUTTON_STATE.PRESSED]: 'active:text-yellow-08',
      [BUTTON_STATE.DISABLED]: 'text-gray-04',
    },
  },
};

export const BUTTON_SIZE_STYLES = {
  [BUTTON_SIZES.LG]: {
    DEFAULT: 'text-body-16-b h-12',
    PADDING: 'px-10',
    ROUNDED: 'rounded-8',
    GAP: 'gap-x-1',
  },
  [BUTTON_SIZES.MD]: {
    DEFAULT: 'text-body-16-m h-10',
    PADDING: 'px-5',
    ROUNDED: 'rounded-8',
    GAP: 'gap-x-0.5',
  },
  [BUTTON_SIZES.SM]: {
    DEFAULT: 'text-body-14-m h-8',
    PADDING: 'px-[0.875rem]',
    ROUNDED: 'rounded-6',
    GAP: 'gap-x-0.5',
  },
  [BUTTON_SIZES.XS]: {
    DEFAULT: 'text-body-12-m h-[1.625rem]',
    PADDING: 'px-[0.625rem]',
    ROUNDED: 'rounded-6',
    GAP: 'gap-x-0.5',
  },
} as const;

export const BUTTON_ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  [BUTTON_SIZES.LG]: 'text-body-16-b',
  [BUTTON_SIZES.MD]: 'text-body-16-b',
  [BUTTON_SIZES.SM]: 'text-body-14-b',
  [BUTTON_SIZES.XS]: 'text-body-12-b',
};
