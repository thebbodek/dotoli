import Image from 'next/image';
import { useState } from 'react';

import { PREVIEW_THUMBNAIL_SIZE } from '@/components/Preview/shared/components/PreviewThumbnails/constants';
import PreviewThumbnailNotSupport from '@/components/Preview/shared/components/PreviewThumbnails/PreviewThumbnailNotSupport';
import { PreviewThumbnailImageProps } from '@/components/Preview/shared/components/PreviewThumbnails/types';
import { ImageErrorBoundary } from '@/components/shared';

const PreviewThumbnailImage = ({
  src,
  setIsLoading,
}: PreviewThumbnailImageProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <ImageErrorBoundary
      className='bg-in-gray-01'
      errorComponent={<PreviewThumbnailNotSupport />}
      isError={isError}
    >
      <Image
        alt=''
        className='h-full w-full object-cover'
        height={PREVIEW_THUMBNAIL_SIZE}
        sizes={`${PREVIEW_THUMBNAIL_SIZE}px`}
        src={src}
        width={PREVIEW_THUMBNAIL_SIZE}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
      />
    </ImageErrorBoundary>
  );
};

export default PreviewThumbnailImage;
