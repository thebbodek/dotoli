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
      [BUTTON_STATE.DEFAULT]: 'bg-in-primary-06 text-in-white',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-primary-07',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-primary-07',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-02 text-in-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]:
        'border-in-primary-05 bg-in-white text-in-primary-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-primary-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-primary-01',
      [BUTTON_STATE.DISABLED]: 'border-in-gray-02 text-in-gray-05 bg-in-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-primary-02 text-in-primary-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-primary-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-primary-03',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-01 text-in-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-in-primary-06',
      [BUTTON_STATE.HOVER]: 'hover:text-in-primary-08',
      [BUTTON_STATE.PRESSED]: 'active:text-in-primary-08',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04',
    },
  },
  [BUTTON_THEMES.GRAY]: {
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-white border-in-gray-02 text-in-gray-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-gray-01 hover:border-in-gray-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-gray-01 active:border-in-gray-03',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04 bg-in-white border-in-gray-02',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-gray-01 text-in-gray-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-gray-02',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-gray-02',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04 bg-in-gray-01',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-in-gray-07',
      [BUTTON_STATE.HOVER]: 'hover:text-in-black',
      [BUTTON_STATE.PRESSED]: 'active:text-in-black',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04',
    },
  },
  [BUTTON_THEMES.RED]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-red-05 text-in-white',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-red-06',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-red-06',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-02 text-in-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'border-in-red-05 bg-in-white text-in-red-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-red-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-red-01',
      [BUTTON_STATE.DISABLED]: 'border-in-gray-02 text-in-gray-05 bg-in-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-red-02 text-in-red-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-red-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-red-03',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-01 text-in-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-in-red-06',
      [BUTTON_STATE.HOVER]: 'hover:text-in-red-07',
      [BUTTON_STATE.PRESSED]: 'active:text-in-red-07',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04',
    },
  },
  [BUTTON_THEMES.GREEN]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-green-05 text-in-white',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-green-06',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-green-06',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-02 text-in-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]: 'border-in-green-05 bg-in-white text-in-green-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-green-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-green-01',
      [BUTTON_STATE.DISABLED]: 'border-in-gray-02 text-in-gray-05 bg-in-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-green-02 text-in-green-06',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-green-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-green-03',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-01 text-in-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-in-green-06',
      [BUTTON_STATE.HOVER]: 'hover:text-in-green-07',
      [BUTTON_STATE.PRESSED]: 'active:text-in-green-07',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04',
    },
  },
  [BUTTON_THEMES.YELLOW]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-yellow-04 text-in-yellow-09',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-yellow-05',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-yellow-05',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-02 text-in-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATE.DEFAULT]:
        'border-in-yellow-04 bg-in-white text-in-yellow-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-yellow-01',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-yellow-01',
      [BUTTON_STATE.DISABLED]: 'border-in-gray-02 text-in-gray-05 bg-in-white',
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATE.DEFAULT]: 'bg-in-yellow-02 text-in-yellow-07',
      [BUTTON_STATE.HOVER]: 'hover:bg-in-yellow-03',
      [BUTTON_STATE.PRESSED]: 'active:bg-in-yellow-03',
      [BUTTON_STATE.DISABLED]: 'bg-in-gray-01 text-in-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATE.DEFAULT]: 'text-in-yellow-07',
      [BUTTON_STATE.HOVER]: 'hover:text-in-yellow-08',
      [BUTTON_STATE.PRESSED]: 'active:text-in-yellow-08',
      [BUTTON_STATE.DISABLED]: 'text-in-gray-04',
    },
  },
};

export const BUTTON_SIZE_STYLES = {
  [BUTTON_SIZES.LG]: {
    DEFAULT: 'text-in-body-16-b h-12',
    PADDING: 'px-10',
    ROUNDED: 'rounded-in-8',
    GAP: 'gap-x-1',
  },
  [BUTTON_SIZES.MD]: {
    DEFAULT: 'text-in-body-16-m h-10',
    PADDING: 'px-5',
    ROUNDED: 'rounded-in-8',
    GAP: 'gap-x-0.5',
  },
  [BUTTON_SIZES.SM]: {
    DEFAULT: 'text-in-body-14-m h-8',
    PADDING: 'px-[0.875rem]',
    ROUNDED: 'rounded-in-6',
    GAP: 'gap-x-0.5',
  },
  [BUTTON_SIZES.XS]: {
    DEFAULT: 'text-in-body-12-m h-[1.625rem]',
    PADDING: 'px-[0.625rem]',
    ROUNDED: 'rounded-in-6',
    GAP: 'gap-x-0.5',
  },
} as const;

export const BUTTON_ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  [BUTTON_SIZES.LG]: 'text-in-body-16-b',
  [BUTTON_SIZES.MD]: 'text-in-body-16-b',
  [BUTTON_SIZES.SM]: 'text-in-body-14-b',
  [BUTTON_SIZES.XS]: 'text-in-body-12-b',
};
