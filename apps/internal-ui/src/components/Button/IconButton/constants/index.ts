import { IconButtonTheme } from '@/components/Button/IconButton/types';

export const ICON_BUTTON_THEMES = {
  HOVER_GRAY: 'hover-gray',
  HOVER_WHITE: 'hover-white',
  BG_WHITE: 'bg-white',
  WHITE: 'white',
  DARK: 'dark',
} as const;

export const ICON_BUTTON_COLORS_STYLES: Record<IconButtonTheme, string> = {
  [ICON_BUTTON_THEMES.HOVER_GRAY]:
    'text-in-gray-06 hover:bg-in-primary-01 active:bg-in-primary-01 disabled:bg-transparent active:text-in-primary-05',
  [ICON_BUTTON_THEMES.HOVER_WHITE]:
    'text-in-gray-06 active:text-in-primary-05 hover:bg-in-white',
  [ICON_BUTTON_THEMES.BG_WHITE]:
    'text-in-gray-06 bg-in-white hover:bg-in-gray-01 disabled:bg-in-gray-01',
  [ICON_BUTTON_THEMES.WHITE]:
    'text-in-white hover:text-in-gray-02 active:text-in-gray-02',
  [ICON_BUTTON_THEMES.DARK]:
    'text-in-white hover:text-in-gray-02 active:text-in-gray-02 bg-in-gray-09',
};
