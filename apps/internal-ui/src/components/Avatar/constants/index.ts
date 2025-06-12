import {
  AvatarSize,
  AvatarTheme,
  AvatarVariant,
} from '@/components/Avatar/types';
import { ImageProps } from 'next/image';

export const AVATAR_VARIANTS = {
  ICON: 'icon',
  IMAGE: 'image',
  TEXT: 'text',
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
  [AVATAR_SIZES.SM]: 'w-8 h-8 rounded-12 border-2 border-white',
  [AVATAR_SIZES.MD]: 'w-10 h-10 rounded-16',
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

export const AVATAR_THEME_STYLES: Record<AvatarTheme, string> = {
  [AVATAR_THEMES.PRIMARY]: 'text-primary-04 bg-primary-02',
  [AVATAR_THEMES.GRAY]: 'bg-gray-02 text-gray-06',
};

export const AVATAR_VARIANT_STYLES: Record<AvatarVariant, string> = {
  [AVATAR_VARIANTS.ICON]: 'text-[0.875rem]',
  [AVATAR_VARIANTS.IMAGE]: 'relative ',
  [AVATAR_VARIANTS.TEXT]: 'text-body-12-m',
};
