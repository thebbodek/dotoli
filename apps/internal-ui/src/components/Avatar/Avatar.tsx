import clsx from 'clsx';

import AvatarImage from '@/components/Avatar/AvatarImage';
import {
  AVATAR_SIZE_STYLES,
  AVATAR_SIZES,
  AVATAR_THEME_STYLES,
  AVATAR_THEMES,
  AVATAR_VARIANT_STYLES,
  AVATAR_VARIANTS,
} from '@/components/Avatar/constants';
import {
  AvatarAllProps,
  AvatarProps,
  AvatarVariant,
} from '@/components/Avatar/types';
import { Flex } from '@/components/Flex';
import { Icon } from '@/components/Icon';

const Avatar = <T extends AvatarVariant>(props: AvatarProps<T>) => {
  const {
    variant,
    size = AVATAR_SIZES.SM,
    theme = AVATAR_THEMES.PRIMARY,
    iconKey,
    src,
    alt,
    fallbackIconKey,
    text,
  } = props as unknown as AvatarAllProps;

  const renderer = () => {
    if (variant === AVATAR_VARIANTS.IMAGE) {
      return (
        <AvatarImage
          src={src}
          alt={alt}
          size={size}
          fallbackIconKey={fallbackIconKey}
        />
      );
    }

    if (variant === AVATAR_VARIANTS.ICON) {
      return <Icon iconKey={iconKey} weight='fill' />;
    }

    if (variant === AVATAR_VARIANTS.TEXT) {
      return text;
    }

    return null;
  };

  return (
    <Flex
      className={clsx(
        AVATAR_SIZE_STYLES[size],
        AVATAR_THEME_STYLES[theme],
        AVATAR_VARIANT_STYLES[variant],
        'overflow-hidden',
      )}
      align={{ items: 'center' }}
      justify={{ content: 'center' }}
    >
      {renderer()}
    </Flex>
  );
};

export default Avatar;
