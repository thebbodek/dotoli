import { IconButtonTheme } from '@/components/Button/IconButton/types';

export const ICON_BUTTON_THEMES = {
  GRAY: 'gray',
  WHITE: 'white',
} as const;

export const ICON_BUTTON_COLORS_STYLES: Record<IconButtonTheme, string> = {
  [ICON_BUTTON_THEMES.GRAY]:
    'hover:bg-primary-01 active:bg-primary-01 disabled:bg-transparent',
  [ICON_BUTTON_THEMES.WHITE]: '',
};
