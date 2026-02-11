import dynamic from 'next/dynamic';
import { useState } from 'react';

import FileThumbnailNotSupport from '@/components/File/FileThumbnail/FileThumbnailNotSupport';
import { FileThumbnailImageProps } from '@/components/File/FileThumbnail/types';
import {
  isSupportImageFileType,
  isSupportPdfFileType,
} from '@/components/Preview/shared';
import { ImageLoadingRenderer, ThumbnailLoading } from '@/components/shared';

const ThumbnailImage = dynamic(
  () => import('@/components/shared/components/Thumbnail/ThumbnailImage'),
  { ssr: false },
);

const ThumbnailPdfImage = dynamic(
  () => import('@/components/shared/components/Thumbnail/ThumbnailPdfImage'),
  { ssr: false },
);

const FileThumbnailImage = ({ file }: FileThumbnailImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const renderer = () => {
    const { type, blob, name, original } = file;
    const defaultProps = {
      alt: name,
      size: 52,
      setIsLoading,
      errorComponent: <FileThumbnailNotSupport />,
    };

    if (isSupportImageFileType({ type })) {
      return <ThumbnailImage src={blob} {...defaultProps} />;
    }

    if (isSupportPdfFileType({ type })) {
      return <ThumbnailPdfImage file={original} {...defaultProps} />;
    }
  };

  return (
    <ImageLoadingRenderer
      className='bg-in-gray-01'
      isLoading={isLoading}
      loadingComponent={<ThumbnailLoading />}
    >
      {renderer()}
    </ImageLoadingRenderer>
  );
};

export default FileThumbnailImage;
