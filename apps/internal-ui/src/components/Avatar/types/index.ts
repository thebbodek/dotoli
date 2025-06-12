import { ReactNode } from 'react';

import {
  AVATAR_SIZES,
  AVATAR_THEMES,
  AVATAR_VARIANTS,
} from '@/components/Avatar';
import { IconProps } from '@/components/Icon/types';

export type AvatarVariant =
  (typeof AVATAR_VARIANTS)[keyof typeof AVATAR_VARIANTS];

export type AvatarSize = (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES];

export type AvatarTheme = (typeof AVATAR_THEMES)[keyof typeof AVATAR_THEMES];

export interface AvatarAllProps {
  variant: AvatarVariant;
  size?: AvatarSize;
  src: string;
  alt: string;
  fallbackIconKey: IconProps['iconKey'];
  iconKey: IconProps['iconKey'];
  text: ReactNode;
  theme?: AvatarTheme;
}

export interface AvatarPrimitiveProps<T extends AvatarVariant>
  extends Pick<AvatarAllProps, 'size'> {
  variant: T;
}

export interface ImageAvatarProps {
  src: string;
  alt?: string;
  fallbackIconKey?: IconProps['iconKey'];
}

export interface IconAvatarProps {
  iconKey: IconProps['iconKey'];
  theme?: AvatarTheme;
}

export interface TextAvatarProps {
  text: ReactNode;
  theme?: AvatarTheme;
}

export type AvatarProps<T extends AvatarVariant> = AvatarPrimitiveProps<T> &
  (T extends typeof AVATAR_VARIANTS.ICON
    ? IconAvatarProps
    : T extends typeof AVATAR_VARIANTS.IMAGE
      ? ImageAvatarProps
      : TextAvatarProps);

export interface AvatarImageProps
  extends ImageAvatarProps,
    Required<Pick<AvatarAllProps, 'size'>> {}
