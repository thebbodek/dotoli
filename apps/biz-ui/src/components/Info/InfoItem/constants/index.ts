import { IconProps } from '@/components/Icon';
import {
  InfoItemTheme,
  InfoItemThemeStyles,
} from '@/components/Info/InfoItem/types';
import { COLOR_VARIANTS } from '@/variants';

export const INFO_ITEM_THEMES = {
  GRAY: 'gray',
  PRIMARY: 'primary',
} as const;

export const INFO_ITEM_ICON_KEY: IconProps['iconKey'] = 'info';

export const INFO_ITEM_BASE_STYLE = 'flex-h-stack w-full items-start gap-[4px]';

export const INFO_ITEM_ICON_STYLE = 'h-[23px] w-[16px] shrink-0 text-[16px]';

export const INFO_ITEM_LABEL_STYLE = 'min-w-0 break-all';

export const INFO_ITEM_STYLES: Record<InfoItemTheme, InfoItemThemeStyles> = {
  [INFO_ITEM_THEMES.GRAY]: {
    ICON: 'text-gray-300',
    LABEL: COLOR_VARIANTS.GRAY_600,
  },
  [INFO_ITEM_THEMES.PRIMARY]: {
    ICON: 'text-blue-200',
    LABEL: COLOR_VARIANTS.BLUE_600,
  },
};
