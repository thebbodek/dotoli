import {
  IconButtonSize,
  IconButtonStyles,
  IconButtonTheme,
} from '@/components/Button/IconButton/types';

export const ICON_BUTTON_THEMES = {
  DEFAULT: 'default',
  FILLED: 'filled',
  DARK: 'dark',
} as const;

export const ICON_BUTTON_SIZES = {
  LG: 'lg',
  SM: 'sm',
} as const;

export const ICON_BUTTON_STATES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  PRESSED: 'pressed',
  DISABLED: 'disabled',
} as const;

export const ICON_BUTTON_SIZE_STYLES: Record<
  IconButtonSize,
  Record<'SIZE' | 'ICON' | 'ROUNDED', string>
> = {
  [ICON_BUTTON_SIZES.LG]: {
    SIZE: 'size-[40px]',
    ICON: 'text-[24px]',
    ROUNDED: 'rounded-6',
  },
  [ICON_BUTTON_SIZES.SM]: {
    SIZE: 'size-[24px]',
    ICON: 'text-[16px]',
    ROUNDED: 'rounded-6',
  },
};

export const ICON_BUTTON_STYLES: Record<IconButtonTheme, IconButtonStyles> = {
  [ICON_BUTTON_THEMES.DEFAULT]: {
    [ICON_BUTTON_STATES.DEFAULT]: 'text-gray-500',
    [ICON_BUTTON_STATES.HOVER]: 'hover:bg-gray-100',
    [ICON_BUTTON_STATES.PRESSED]: 'active:bg-gray-100',
    [ICON_BUTTON_STATES.DISABLED]: 'text-gray-300',
  },
  [ICON_BUTTON_THEMES.FILLED]: {
    [ICON_BUTTON_STATES.DEFAULT]: 'bg-white text-gray-500',
    [ICON_BUTTON_STATES.HOVER]: 'hover:bg-gray-100',
    [ICON_BUTTON_STATES.PRESSED]: 'active:bg-gray-100',
    [ICON_BUTTON_STATES.DISABLED]: 'text-gray-300',
  },
  [ICON_BUTTON_THEMES.DARK]: {
    [ICON_BUTTON_STATES.DEFAULT]: 'text-white',
    [ICON_BUTTON_STATES.HOVER]: 'hover:text-gray-200',
    [ICON_BUTTON_STATES.PRESSED]: 'active:text-gray-200',
    [ICON_BUTTON_STATES.DISABLED]: 'text-gray-300',
  },
};
