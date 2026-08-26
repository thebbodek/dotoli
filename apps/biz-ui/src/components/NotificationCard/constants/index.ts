import { ICON_CIRCLE_THEMES } from '@/components/IconCircle';
import {
  NotificationCardColors,
  NotificationCardTheme,
} from '@/components/NotificationCard/types';
import { COLOR_VARIANTS } from '@/variants';

export const NOTIFICATION_CARD_THEMES = {
  PRIMARY: ICON_CIRCLE_THEMES.PRIMARY,
  RED: ICON_CIRCLE_THEMES.RED,
  YELLOW: ICON_CIRCLE_THEMES.YELLOW,
  GREEN: ICON_CIRCLE_THEMES.GREEN,
  GRAY: ICON_CIRCLE_THEMES.GRAY,
} as const;

export const NOTIFICATION_CARD_DEFAULT_THEME = NOTIFICATION_CARD_THEMES.PRIMARY;

export const NOTIFICATION_CARD_BASE_STYLE =
  'flex-v-stack w-full items-center gap-[12px]';

export const NOTIFICATION_CARD_HEADER_STYLE =
  'flex-v-stack w-full items-center gap-[10px]';

export const NOTIFICATION_CARD_TEXT_STYLE =
  'flex-v-stack w-full items-center gap-[2px] text-center';

export const NOTIFICATION_CARD_HISTORY_STYLE = 'flex-h-stack-center gap-[5px]';

export const NOTIFICATION_CARD_HISTORY_DIVIDER_STYLE =
  'h-[12px] w-px shrink-0 bg-gray-500';

export const NOTIFICATION_CARD_HIGHLIGHT_STYLES: Record<
  NotificationCardTheme,
  string
> = {
  [NOTIFICATION_CARD_THEMES.PRIMARY]:
    '[&_strong]:text-heading-4 [&_strong]:text-blue-600',
  [NOTIFICATION_CARD_THEMES.RED]:
    '[&_strong]:text-heading-4 [&_strong]:text-red-600',
  [NOTIFICATION_CARD_THEMES.YELLOW]:
    '[&_strong]:text-heading-4 [&_strong]:text-yellow-700',
  [NOTIFICATION_CARD_THEMES.GREEN]:
    '[&_strong]:text-heading-4 [&_strong]:text-green-600',
  [NOTIFICATION_CARD_THEMES.GRAY]:
    '[&_strong]:text-heading-4 [&_strong]:text-gray-800',
};

export const NOTIFICATION_CARD_COLORS: NotificationCardColors = {
  TITLE: COLOR_VARIANTS.GRAY_800,
  SUB_TEXT: COLOR_VARIANTS.GRAY_600,
  HISTORY_TIME: COLOR_VARIANTS.GRAY_500,
  HISTORY_REGISTRANT: COLOR_VARIANTS.GRAY_700,
  PERIOD: COLOR_VARIANTS.BLUE_400,
};
