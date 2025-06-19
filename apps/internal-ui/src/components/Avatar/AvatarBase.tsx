import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  AVATAR_SIZE_STYLES,
  AVATAR_THEME_STYLES,
} from '@/components/Avatar/constants';
import { AvatarBaseProps } from '@/components/Avatar/types';
import { Flex } from '@/components/Flex';

const AvatarBase = ({
  size,
  theme,
  children,
  className,
}: PropsWithChildren<AvatarBaseProps>) => {
  return (
    <Flex
      className={clsx(
        className,
        AVATAR_SIZE_STYLES[size],
        AVATAR_THEME_STYLES[theme],
        'overflow-hidden',
      )}
      align={{ items: 'center' }}
      justify={{ content: 'center' }}
    >
      {children}
    </Flex>
  );
};

export default AvatarBase;
