import Image from 'next/image';
import { useState } from 'react';

import AvatarIcon from '@/components/Avatar/AvatarIcon';
import { AVATAR_SIZE_IMAGE_PROPS } from '@/components/Avatar/constants';
import { AvatarImageProps } from '@/components/Avatar/types';

const AvatarImage = ({ src, alt, size, type }: AvatarImageProps) => {
  const [isError, setIsError] = useState(false);

  if (!src || isError) {
    return <AvatarIcon size={size} type={type} />;
  }

  return (
    <Image
      alt={alt ?? ''}
      className='h-full w-full object-cover'
      src={src}
      unoptimized
      onError={() => setIsError(true)}
      {...AVATAR_SIZE_IMAGE_PROPS[size]}
    />
  );
};

export default AvatarImage;
