import { IconButtonColors } from '@/components/Button/IconButton/types';

export const ICON_BUTTON_COLORS = {
  GRAY: 'gray',
  WHITE: 'white',
} as const;

export const ICON_BUTTON_COLORS_STYLES_MAPPER: Record<
  IconButtonColors,
  string
> = {
  [ICON_BUTTON_COLORS.GRAY]:
    'hover:bg-primary-01 active:bg-primary-01 disabled:bg-transparent',
  [ICON_BUTTON_COLORS.WHITE]: '',
};
