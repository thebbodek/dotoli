import Image from 'next/image';
import { useState } from 'react';

import { ImageErrorBoundary } from '@/components/shared/components/ImageErrorBoundary';
import { ThumbnailImageProps } from '@/components/shared/components/Thumbnail/types';

const ThumbnailImage = ({
  src,
  size,
  setIsLoading,
  errorComponent,
  alt,
}: ThumbnailImageProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <ImageErrorBoundary
      className='bg-in-gray-01'
      errorComponent={errorComponent}
      isError={isError}
    >
      <Image
        alt={alt}
        className='h-full w-full object-cover'
        height={size}
        sizes={`${size}px`}
        src={src}
        width={size}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
      />
    </ImageErrorBoundary>
  );
};

export default ThumbnailImage;
