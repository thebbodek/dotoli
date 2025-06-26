import { IconButtonTheme } from '@/components/Button/IconButton/types';

export const ICON_BUTTON_THEMES = {
  HOVER_GRAY: 'hover-gray',
  HOVER_WHITE: 'hover-white',
  BG_WHITE: 'bg-white',
} as const;

export const ICON_BUTTON_COLORS_STYLES: Record<IconButtonTheme, string> = {
  [ICON_BUTTON_THEMES.HOVER_GRAY]:
    'hover:bg-primary-01 active:bg-primary-01 disabled:bg-transparent active:text-primary-05',
  [ICON_BUTTON_THEMES.HOVER_WHITE]: 'active:text-primary-05',
  [ICON_BUTTON_THEMES.BG_WHITE]:
    'bg-white hover:bg-gray-01 disabled:bg-gray-01',
};
