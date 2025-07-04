import Image from 'next/image';
import { useState } from 'react';

import AvatarIcon from '@/components/Avatar/AvatarIcon';
import { AVATAR_SIZE_IMAGE_PROPS } from '@/components/Avatar/constants';
import { AvatarImageProps } from '@/components/Avatar/types';

const AvatarImage = ({ src, alt, size, type }: AvatarImageProps) => {
  const [isError, setIsError] = useState(false);

  if (!src || isError) {
    return <AvatarIcon type={type} size={size} />;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ''}
      onError={() => setIsError(true)}
      className='h-full w-full object-cover'
      unoptimized
      {...AVATAR_SIZE_IMAGE_PROPS[size]}
    />
  );
};

export default AvatarImage;
