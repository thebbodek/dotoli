import { IconButtonTheme } from '@/components/Button/IconButton/types';

export const ICON_BUTTON_THEMES = {
  HOVER_GRAY: 'hover-gray',
  HOVER_WHITE: 'hover-white',
  BG_WHITE: 'bg-white',
} as const;

export const ICON_BUTTON_COLORS_STYLES: Record<IconButtonTheme, string> = {
  [ICON_BUTTON_THEMES.HOVER_GRAY]:
    'hover:bg-in-primary-01 active:bg-in-primary-01 disabled:bg-transparent active:text-in-primary-05',
  [ICON_BUTTON_THEMES.HOVER_WHITE]: 'active:text-in-primary-05',
  [ICON_BUTTON_THEMES.BG_WHITE]:
    'bg-in-white hover:bg-in-gray-01 disabled:bg-in-gray-01',
};
