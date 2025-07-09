import {
  ButtonSize,
  ButtonSizeStyle,
  ButtonState,
  ButtonTheme,
  ButtonVariant,
} from '@/components/Button/shared/types';
import { CONTAINER_VARIANTS } from '@/variants/container';
import { ContainerVariant } from '@/variants/container/types';

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
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
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
  [BUTTON_SIZES.XS]: {
    DEFAULT: 'in-button-xs',
    PADDING: 'in-button-xs-padding',
    ROUNDED: 'in-button-xs-rounded',
    GAP: 'in-button-xs-gap',
  },
  [BUTTON_SIZES.SM]: {
    DEFAULT: 'in-button-sm',
    PADDING: 'in-button-sm-padding',
    ROUNDED: 'in-button-sm-rounded',
    GAP: 'in-button-sm-gap',
  },
  [BUTTON_SIZES.MD]: {
    DEFAULT: 'in-button-md',
    PADDING: 'in-button-md-padding',
    ROUNDED: 'in-button-md-rounded',
    GAP: 'in-button-md-gap',
  },
  [BUTTON_SIZES.LG]: {
    DEFAULT: 'in-button-lg',
    PADDING: 'in-button-lg-padding',
    ROUNDED: 'in-button-lg-rounded',
    GAP: 'in-button-lg-gap',
  },
} as const;

export const BUTTON_ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  [BUTTON_SIZES.XS]: 'in-button-xs-icon',
  [BUTTON_SIZES.SM]: 'in-button-sm-icon',
  [BUTTON_SIZES.MD]: 'in-button-md-icon',
  [BUTTON_SIZES.LG]: 'in-button-lg-icon',
};

export const BUTTON_SIZE_RESPONSIVE_STYLES: Record<
  ContainerVariant,
  Record<ButtonSize, ButtonSizeStyle>
> = {
  [CONTAINER_VARIANTS.MOBILE]: {
    [BUTTON_SIZES.XS]: {
      DEFAULT: 'in-mobile:in-button-xs',
      PADDING: 'in-mobile:in-button-xs-padding',
      ROUNDED: 'in-mobile:in-button-xs-padding',
      GAP: 'in-mobile:in-button-xs-padding',
    },
    [BUTTON_SIZES.SM]: {
      DEFAULT: 'in-mobile:in-button-sm',
      PADDING: 'in-mobile:in-button-sm-padding',
      ROUNDED: 'in-mobile:in-button-sm-padding',
      GAP: 'in-mobile:in-button-sm-padding',
    },
    [BUTTON_SIZES.MD]: {
      DEFAULT: 'in-mobile:in-button-md',
      PADDING: 'in-mobile:in-button-md-padding',
      ROUNDED: 'in-mobile:in-button-md-padding',
      GAP: 'in-mobile:in-button-md-padding',
    },
    [BUTTON_SIZES.LG]: {
      DEFAULT: 'in-mobile:in-button-lg',
      PADDING: 'in-mobile:in-button-lg-padding',
      ROUNDED: 'in-mobile:in-button-lg-padding',
      GAP: 'in-mobile:in-button-lg-padding',
    },
  },
  [CONTAINER_VARIANTS.TABLET]: {
    [BUTTON_SIZES.XS]: {
      DEFAULT: 'in-tablet:in-button-xs',
      PADDING: 'in-tablet:in-button-xs-padding',
      ROUNDED: 'in-tablet:in-button-xs-rounded',
      GAP: 'in-tablet:in-button-xs-gap',
    },
    [BUTTON_SIZES.SM]: {
      DEFAULT: 'in-tablet:in-button-sm',
      PADDING: 'in-tablet:in-button-sm-padding',
      ROUNDED: 'in-tablet:in-button-sm-rounded',
      GAP: 'in-tablet:in-button-sm-gap',
    },
    [BUTTON_SIZES.MD]: {
      DEFAULT: 'in-tablet:in-button-md',
      PADDING: 'in-tablet:in-button-md-padding',
      ROUNDED: 'in-tablet:in-button-md-rounded',
      GAP: 'in-tablet:in-button-md-gap',
    },
    [BUTTON_SIZES.LG]: {
      DEFAULT: 'in-tablet:in-button-lg',
      PADDING: 'in-tablet:in-button-lg-padding',
      ROUNDED: 'in-tablet:in-button-lg-rounded',
      GAP: 'in-tablet:in-button-lg-gap',
    },
  },
  [CONTAINER_VARIANTS.DESKTOP]: {
    [BUTTON_SIZES.XS]: {
      DEFAULT: 'in-desktop:in-button-xs',
      PADDING: 'in-desktop:in-button-xs-padding',
      ROUNDED: 'in-desktop:in-button-xs-rounded',
      GAP: 'in-desktop:in-button-xs-gap',
    },
    [BUTTON_SIZES.SM]: {
      DEFAULT: 'in-desktop:in-button-sm',
      PADDING: 'in-desktop:in-button-sm-padding',
      ROUNDED: 'in-desktop:in-button-sm-rounded',
      GAP: 'in-desktop:in-button-sm-gap',
    },
    [BUTTON_SIZES.MD]: {
      DEFAULT: 'in-desktop:in-button-md',
      PADDING: 'in-desktop:in-button-md-padding',
      ROUNDED: 'in-desktop:in-button-md-rounded',
      GAP: 'in-desktop:in-button-md-gap',
    },
    [BUTTON_SIZES.LG]: {
      DEFAULT: 'in-desktop:in-button-lg',
      PADDING: 'in-desktop:in-button-lg-padding',
      ROUNDED: 'in-desktop:in-button-lg-rounded',
      GAP: 'in-desktop:in-button-lg-gap',
    },
  },
};

export const ICON_SIZE_RESPONSIVE_STYLES: Record<
  ContainerVariant,
  Record<ButtonSize, string>
> = {
  [CONTAINER_VARIANTS.MOBILE]: {
    [BUTTON_SIZES.XS]: 'in-mobile:in-button-xs-icon',
    [BUTTON_SIZES.SM]: 'in-mobile:in-button-sm-icon',
    [BUTTON_SIZES.MD]: 'in-mobile:in-button-md-icon',
    [BUTTON_SIZES.LG]: 'in-mobile:in-button-lg-icon',
  },
  [CONTAINER_VARIANTS.TABLET]: {
    [BUTTON_SIZES.XS]: 'in-tablet:in-button-xs-icon',
    [BUTTON_SIZES.SM]: 'in-tablet:in-button-sm-icon',
    [BUTTON_SIZES.MD]: 'in-tablet:in-button-md-icon',
    [BUTTON_SIZES.LG]: 'in-tablet:in-button-lg-icon',
  },
  [CONTAINER_VARIANTS.DESKTOP]: {
    [BUTTON_SIZES.XS]: 'in-desktop:in-button-xs-icon',
    [BUTTON_SIZES.SM]: 'in-desktop:in-button-sm-icon',
    [BUTTON_SIZES.MD]: 'in-desktop:in-button-md-icon',
    [BUTTON_SIZES.LG]: 'in-desktop:in-button-lg-icon',
  },
};
