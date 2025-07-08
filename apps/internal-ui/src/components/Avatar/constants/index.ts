import { ImageProps } from 'next/image';

import { AvatarSize, AvatarTheme, AvatarType } from '@/components/Avatar/types';
import { IconProps } from '@/components/Icon';

export const AVATAR_TYPES = {
  SINGLE: 'single',
  GROUP: 'group',
} as const;

export const AVATAR_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const AVATAR_THEMES = {
  PRIMARY: 'primary',
  GRAY: 'gray',
} as const;

export const AVATAR_SIZE_STYLES: Record<AvatarSize, string> = {
  [AVATAR_SIZES.SM]: 'w-8 h-8 rounded-in-12 border-2 border-in-white',
  [AVATAR_SIZES.MD]: 'w-10 h-10 rounded-in-16',
};

export const AVATAR_SIZE_IMAGE_PROPS: Record<
  AvatarSize,
  Pick<ImageProps, 'width' | 'height'>
> = {
  [AVATAR_SIZES.SM]: {
    width: 32,
    height: 32,
  },
  [AVATAR_SIZES.MD]: {
    width: 40,
    height: 40,
  },
};

export const AVATAR_ICON_KEYS: Record<AvatarType, IconProps['iconKey']> = {
  [AVATAR_TYPES.SINGLE]: 'user',
  [AVATAR_TYPES.GROUP]: 'users-three',
};

export const AVATAR_ICON_STYLES = {
  [AVATAR_TYPES.SINGLE]: {
    [AVATAR_SIZES.SM]: 'text-[0.875rem]',
    [AVATAR_SIZES.MD]: 'text-[1.125rem]',
  },
  [AVATAR_TYPES.GROUP]: {
    [AVATAR_SIZES.SM]: 'text-[1rem]',
    [AVATAR_SIZES.MD]: 'text-[1.25rem]',
  },
} as const;

export const AVATAR_THEME_STYLES: Record<AvatarTheme, string> = {
  [AVATAR_THEMES.PRIMARY]: 'text-in-primary-04 bg-in-primary-02',
  [AVATAR_THEMES.GRAY]: 'bg-in-gray-02 text-in-gray-06',
};
