import Image from 'next/image';
import { useState } from 'react';

import { AvatarImageProps } from '@/components/Avatar/types';
import { Icon } from '@/components/Icon';
import { AVATAR_SIZE_IMAGE_PROPS } from '@/components/Avatar/constants';

const AvatarImage = ({
  src,
  alt,
  size,
  fallbackIconKey = 'user',
}: AvatarImageProps) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <Icon
        iconKey={fallbackIconKey}
        weight='fill'
        className='text-[0.875rem]'
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? ''}
      onError={() => setIsError(true)}
      className='h-full w-full object-cover'
      {...AVATAR_SIZE_IMAGE_PROPS[size]}
    />
  );
};

export default AvatarImage;
