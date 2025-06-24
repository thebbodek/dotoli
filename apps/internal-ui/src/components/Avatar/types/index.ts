import { HTMLAttributes } from 'react';

import { AVATAR_SIZES, AVATAR_THEMES, AVATAR_TYPES } from '@/components/Avatar';

export type AvatarType = (typeof AVATAR_TYPES)[keyof typeof AVATAR_TYPES];

export type AvatarSize = (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES];

export type AvatarTheme = (typeof AVATAR_THEMES)[keyof typeof AVATAR_THEMES];

export interface AvatarBaseProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  size: AvatarSize;
  theme: AvatarTheme;
}

export interface AvatarProps extends Partial<Pick<AvatarBaseProps, 'size'>> {
  type: AvatarType;
  src?: string;
  alt?: string;
}

export interface AvatarImageProps
  extends Pick<AvatarBaseProps, 'size'>,
    Pick<AvatarProps, 'alt' | 'src' | 'type'> {}

export interface AvatarIconProps
  extends Required<Pick<AvatarProps, 'type' | 'size'>> {}
