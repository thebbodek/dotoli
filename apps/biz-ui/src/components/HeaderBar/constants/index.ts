import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import { ButtonIconPosition } from '@/components/Button/shared/types';
import {
  HeaderBarTheme,
  HeaderBarThemeStyles,
} from '@/components/HeaderBar/types';
import { ICON_WEIGHTS } from '@/components/Icon/constants';
import { COLOR_VARIANTS } from '@/variants';

export const HEADER_BAR_TYPES = {
  HOME: 'home',
  NAVIGATION: 'navigation',
  BOTTOM_SHEET: 'bottomSheet',
} as const;

export const HEADER_BAR_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const HEADER_BAR_BASE_STYLE = 'w-full';

export const HEADER_BAR_ROW_STYLE =
  'flex-h-stack h-[54px] items-center justify-between px-[20px]';

export const HEADER_BAR_BOTTOM_SHEET_STYLE = 'rounded-t-16';

export const HEADER_BAR_TITLE_STYLE = 'min-w-0 truncate';

export const HEADER_BAR_NAVIGATION_TITLE_STYLE = 'flex-1 text-center';

export const HEADER_BAR_HOME_TITLE_STYLE =
  'flex-h-stack min-w-0 cursor-pointer items-center gap-1';

export const HEADER_BAR_CARET_ICON_KEY = 'caret-down';

export const HEADER_BAR_CARET_STYLE = 'shrink-0 text-[13px]';

export const HEADER_BAR_NOTIFICATION_ICON_KEY = 'bell';

export const HEADER_BAR_NOTIFICATION_ICON_WEIGHT = ICON_WEIGHTS.REGULAR;

export const HEADER_BAR_NOTIFICATION_LABEL = '알림';

export const HEADER_BAR_NOTIFICATION_BUTTON_STYLE =
  'flex-h-stack-center relative size-[40px] shrink-0 cursor-pointer text-[28px]';

export const HEADER_BAR_NOTIFICATION_DOT_STYLE =
  'absolute top-[10px] left-[26px] size-[6px] rounded-full bg-blue-600 ring-2 ring-white';

export const HEADER_BAR_BACK_LABEL = '뒤로';

export const HEADER_BAR_BACK_ICON_KEY = 'caret-left';

export const HEADER_BAR_CLOSE_LABEL = '닫기';

export const HEADER_BAR_CLOSE_ICON_KEY = 'x';

export const HEADER_BAR_NAVIGATION_BUTTON_STYLE =
  'flex-h-stack-center relative shrink-0 cursor-pointer gap-[2px] rounded-6 text-gray-800 text-label-bold';

export const HEADER_BAR_NAVIGATION_BUTTON_ICON_STYLE = 'text-gray-400';

export const HEADER_BAR_NAVIGATION_BUTTON_POSITION_STYLES: Record<
  ButtonIconPosition,
  string
> = {
  [BUTTON_ICON_POSITIONS.LEFT]: '',
  [BUTTON_ICON_POSITIONS.RIGHT]: 'flex-row-reverse',
};

export const HEADER_BAR_PROGRESS_TRACK_STYLE = 'h-[3px] w-full bg-gray-200';

export const HEADER_BAR_PROGRESS_VALUE_STYLE = 'h-full bg-blue-500';

export const HEADER_BAR_PROGRESS_MIN_STEP = 0;

export const HEADER_BAR_PROGRESS_MIN_RATE = 0;

export const HEADER_BAR_PROGRESS_MAX_RATE = 100;

export const HEADER_BAR_THEME_STYLES: Record<
  HeaderBarTheme,
  HeaderBarThemeStyles
> = {
  [HEADER_BAR_THEMES.LIGHT]: {
    CONTAINER: 'bg-white',
    TITLE: COLOR_VARIANTS.GRAY_800,
    CARET: 'text-gray-400',
    NOTIFICATION_ICON: 'text-gray-800',
  },
  [HEADER_BAR_THEMES.DARK]: {
    CONTAINER: 'bg-transparent',
    TITLE: COLOR_VARIANTS.GRAY_100,
    CARET: 'text-gray-200',
    NOTIFICATION_ICON: 'text-white',
  },
};
