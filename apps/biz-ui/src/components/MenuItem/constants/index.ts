import { ICON_WEIGHTS } from '@/components/Icon/constants';
import { IconProps } from '@/components/Icon/types';
import {
  ICON_CIRCLE_SIZES,
  ICON_CIRCLE_THEMES,
} from '@/components/IconCircle/constants';
import { MenuItemColors } from '@/components/MenuItem/types';
import { COLOR_VARIANTS } from '@/variants';

export const MENU_ITEM_ICON_KEYS = {
  CHAT: 'chat-centered-dots',
  PHONE: 'phone-call',
} as const satisfies Record<string, IconProps['iconKey']>;

export const MENU_ITEM_ICON_SIZE = ICON_CIRCLE_SIZES.SM;

export const MENU_ITEM_ICON_THEME = ICON_CIRCLE_THEMES.GRAY;

export const MENU_ITEM_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const MENU_ITEM_BASE_STYLE =
  'flex-h-stack h-[82px] w-full cursor-pointer items-center gap-[12px] rounded-16 bg-white px-[19px] inset-ring inset-ring-gray-200';

export const MENU_ITEM_CONTENT_STYLE = 'flex-v-stack min-w-0 flex-1';

export const MENU_ITEM_TEXT_STYLE = 'truncate text-left';

export const MENU_ITEM_COLORS: MenuItemColors = {
  LABEL: COLOR_VARIANTS.GRAY_800,
  DESCRIPTION: COLOR_VARIANTS.GRAY_600,
};
